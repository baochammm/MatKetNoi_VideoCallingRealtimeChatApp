import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import sequelize from '../lib/sequelize.js';

class User extends Model {
  async matchPassword(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
}


User.init({
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [6] },
  },
  bio: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  nativeLanguage: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  learningLanguage: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  location: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  isOnboarded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  sequelize,
  modelName: 'User',
  timestamps: true,
  hooks: {
    beforeSave: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

User.belongsToMany(User, {
  as: 'Friends',
  through: 'UserFriends',
  foreignKey: 'userId',
  otherKey: 'friendId',
  timestamps: false,
});


export default User;


