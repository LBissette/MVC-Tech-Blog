const router = require('express').Router();
const { BlogPost, Comment, User } = require('../models').default;
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const getAllBlogPosts = await BlogPost.findAll({
      where: { user_id: req.session.user_id },
      include: User,
      Comment,
    });
    const blogPostsPlain = getAllBlogPosts.map((post) =>
      post.get({ plain: true })
    );

    const getAllComments = await Comment.findAll({
      where: { user_id: req.session.user_id },
      include: [User, BlogPost],
    });
    const commentsPlain = getAllComments.map((comment) =>
      comment.get({ plain: true })
    );
    const postsAndComments = blogPostsPlain
      .concat(commentsPlain)
      .sort((a, b) => {
        return b.timestamp - a.timestamp;
      });
    res.render('dashboard', {
      user_id: req.session.user_id,
      loggedIn: req.session.loggedIn,
      postsAndComments: postsAndComments,
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
