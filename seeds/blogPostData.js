const sequelize = require("../config/connection");
const { BlogPost } = require("../models");

const seedBlogPosts = async () => {
  await BlogPost.bulkCreate([
  {
    id: 1,
    title: "Why MVC is so important",
    content: "MVC allows developers to maintain a true separation of concerns, devising their code between the Model Layer for data, the View layer for design, and the Controller layer for application logic.",
    user_id: 1,
    timestamp: new Date(2023, 4, 13, 6, 15, 08)
  },
  {
    id: 2,
    title: "Authentication vs. Authorization",
    content: "There is a difference between authentication and authorization. Authentication means confirming your own identity, whereas authorizatoin means being allowed access to the system.",
    user_id: 2,
    timestamp: new Date(2023, 4, 11, 12, 46, 32)
  },
  {
    id: 3,
    title: "Object-Relational Mapping",
    content: "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!",
    user_id: 3,
    timestamp: new Date(2023, 4, 12, 8, 20, 15)
  }
])
};

module.exports = seedBlogPosts
