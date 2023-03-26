const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const getAllBlogPosts = await BlogPost.findAll({
        where: {user_id: req.session.user_id}, 
        include: Comment,
    });
    const blogPostsPlain = getAllBlogPosts.map((post) => post.get({ plain: true }));

    res.render("dashboard", { 
        user_id: req.session.user_id, 
        blogPosts: blogPostsPlain 
    });
    } catch (err) {
        res.send(400).send(err);
    }
});

module.exports = router;