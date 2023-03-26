const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const getAllBlogPosts = await BlogPost.findAll({ include: Comment});
    res.status(200).json(getAllBlogPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const getBlogPost = await BlogPost.findByPk(req.params.id, {
      include: [User, Comment],
    });
    const blogPostPlain = getBlogPost.get({plain : true });
    const getComment = await Comment.findAll({ 
      where: { post_id: req.params.id }, 
      include: [User, BlogPost] });
    const commentPlain = getComment.map((comment) => comment.get({ plain: true }));

    // res.status(200).json(getBlogPost)
    res.render("blog-post-page", { user_id: req.session.user_id, forum_post: blogPostPlain, comments: commentPlain });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
