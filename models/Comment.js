const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: { model: 'user', key: 'id' },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: 'blog_post', key: 'id' },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'comment',
    createdAt: 'timestamp',
    updatedAt: false,
  }
);

module.exports = Comment;
