const sequelize = require("../config/connection");
const { User } = require("../models");

const seedUsers = async () => {
  await User.bulkCreate([
  {
    username: "Sal",
    password: "password12345"
  },
  {
    username: "Lernantino",
    password: "password12345"
  },
  {
    username: "Amiko",
    password: "password12345"
  },
  {
    username: "Jordan",
    password: "password12345"
  },
  {
    username: "Blake",
    password: "password12345"
  }
])
};

module.exports = seedUsers