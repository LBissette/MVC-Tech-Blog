const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const getBlogPost = await BlogPost.findByPk(req.params.id, {
        include: User, Comment
    });
    const blogPostPlain = getBlogPost.map((post) => post.get({ plain: true }));
    
    const getComments = await Comment.findAll({ 
        where: { post_id: req.params.id }, 
        include: [User, BlogPost] 
    });
    const commentsPlain = getComments.map((comment) => comment.get({ plain: true }));
    

    res.render('singlePost', 
    { 
        user_id: req.session.user_id, 
        loggedIn: req.session.loggedIn, 
        blog_post: blogPostPlain,
        comments: commentsPlain 
    });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;