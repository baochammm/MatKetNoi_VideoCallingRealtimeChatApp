import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import NoFriendsFound from "../components/NoFriendsFound";
const FriendsPage = () => {
    const queryClient = useQueryClient();
     const { data: friends = [], isLoading: loadingFriends } = useQuery({
        queryKey: ["friends"],
        queryFn: getUserFriends,
      });
return (
    <div className="p-4 sm:p-6 lg:p-8">
          {loadingFriends ? (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    ) : friends.length === 0 ? (
      <NoFriendsFound />
    ) : (
      // Changed from grid to flex row
      <div className="flex flex-row flex-wrap gap-4">
        {friends.map((friend) => (
          <FriendCard key={friend.id} friend={friend} />
        ))}
      </div>
    )}
    </div>
);
};
export default FriendsPage;
