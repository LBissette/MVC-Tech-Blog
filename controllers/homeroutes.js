const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');
const session = require('express-session')

router.get('/', async (req, res) => {
  try {

    const blogPost = await BlogPost.findAll({
      order: [["timestamp", "DESC" ]], 
      include: User 
    });
    const blogPostPlain = blogPost.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      user_id: req.session.user_id, 
      loggedIn: req.session.loggedIn,
      blogPosts: blogPostPlain 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }
  res.render('login', {
    user_id: req.session.user_id, 
    loggedIn: req.session.loggedIn
  });
});

module.exports = router;
