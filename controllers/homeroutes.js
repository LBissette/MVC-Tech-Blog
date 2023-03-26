const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    const blogPost = await BlogPost.findAll({
      order: [["timestamp", "DESC" ]], 
      include: User 
    });
    const blogPostPlain = blogPost.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      user_id: req.session.user_id, 
      blogPosts: blogPostPlain 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login", { user_id: req.session.user_id });
});

module.exports = router;
