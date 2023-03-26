const sequelize = require('../config/connection');
const seedUsers = require("./userData");
const seedBlogPosts = require("./blogPostData");
const seedComments = require("./commentData");

const seedData = async () => {
 
  await sequelize.sync({ force: true });
  await seedUsers();
  await seedBlogPosts();
  await seedComments();

  process.kill(0);
};

seedData();
