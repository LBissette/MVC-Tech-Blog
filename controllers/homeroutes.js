const router = require('express').Router();
const { BlogPost, User } = require('../models').default;
const withAuth = require('../utils/auth');
const session = require('express-session');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', async (req, res) => {
  try {
    const blogPost = await BlogPost.findAll({
      order: [['timestamp', 'DESC']],
      include: User,
    });
    const blogPostPlain = blogPost.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
      blogPosts: blogPostPlain,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('dashboard');
    return;
  }
  res.render('login', {
    user_id: req.session.user_id,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
