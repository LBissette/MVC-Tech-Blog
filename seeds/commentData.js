const sequelize = require("../config/connection");
const { Comment } = require("../models");

const seedComments = async () => {
  await Comment.bulkCreate([
  {
    id: 1,
    content: "You're so right!",
    user_id: 1,
    post_id: 3,
    timestamp: new Date(2023, 4, 14, 5, 3, 24)
  },
  {
    id: 2,
    content: "That clears it up.",
    user_id: 2,
    post_id: 1,
    timestamp: new Date(2023, 4, 13, 21, 9, 41)
  },
  {
    id: 3,
    content: "It's crazy!",
    user_id: 3,
    post_id: 2,
    timestamp: new Date(2023, 4, 12, 9, 31, 28)
  }
])
};

module.exports = seedComments