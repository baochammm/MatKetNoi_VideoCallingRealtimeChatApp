import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";
import { Op } from "sequelize";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;

    // Get IDs of current user's friends
    const currentUser = await User.findByPk(currentUserId, {
      include: {
        model: User,
        as: "Friends",
        attributes: ["id"],
      },
    });

    const friendIds = currentUser.Friends.map(f => f.id);

    const recommendedUsers = await User.findAll({
      where: {
        id: {
          [Op.notIn]: [currentUserId, ...friendIds],
        },
        isOnboarded: true,
      },
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in getRecommendedUsers controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      include: {
        model: User,
        as: "Friends",
        attributes: ["id", "fullName", "profilePic", "nativeLanguage", "learningLanguage"],
        through: { attributes: [] }, // exclude join table
      },
    });

    res.status(200).json(user.Friends);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (parseInt(myId) === parseInt(recipientId)) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findByPk(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Check if already friends
    const existingFriend = await recipient.hasFriend(await User.findByPk(myId));
    if (existingFriend) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      where: {
        [Op.or]: [
          { senderId: myId, recipientId },
          { senderId: recipientId, recipientId: myId },
        ],
      },
    });

    if (existingRequest) {
      return res.status(400).json({ message: "A friend request already exists" });
    }

    const friendRequest = await FriendRequest.create({
      senderId: myId,
      recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const currentUserId = req.user.id;

    const friendRequest = await FriendRequest.findByPk(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    if (friendRequest.recipientId !== parseInt(currentUserId)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    // Add friends to each other
    const sender = await User.findByPk(friendRequest.senderId);
    const recipient = await User.findByPk(friendRequest.recipientId);

    await sender.addFriend(recipient);
    await recipient.addFriend(sender);

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.findAll({
      where: {
        recipientId: req.user.id,
        status: "pending",
      },
      include: {
        model: User,
        as: "sender",
        attributes: ["id", "fullName", "profilePic", "nativeLanguage", "learningLanguage"],
      },
    });

    const acceptedReqs = await FriendRequest.findAll({
      where: {
        senderId: req.user.id,
        status: "accepted",
      },
      include: {
        model: User,
        as: "recipient",
        attributes: ["id", "fullName", "profilePic"],
      },
    });

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.findAll({
      where: {
        senderId: req.user.id,
        status: "pending",
      },
      include: {
        model: User,
        as: "recipient",
        attributes: ["id", "fullName", "profilePic", "nativeLanguage", "learningLanguage"],
      },
    });

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
