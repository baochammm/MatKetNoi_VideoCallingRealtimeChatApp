import { DataTypes, Model } from 'sequelize';
import sequelize from '../lib/sequelize.js';
import User from './User.js';

class FriendRequest extends Model {}

FriendRequest.init({
  status: {
    type: DataTypes.ENUM('pending', 'accepted'),
    defaultValue: 'pending',
  }
}, {
  sequelize,
  modelName: 'FriendRequest',
  timestamps: true,
});

// Associations
FriendRequest.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
FriendRequest.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });

export default FriendRequest;
