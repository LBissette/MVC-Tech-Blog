const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models').default;
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const getAllComments = await Comment.findAll({
      include: BlogPost,
    });
    res.status(200).json(getAllComments);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const getComment = await Comment.findByPk(req.params.id, {
      include: BlogPost,
    });
    res.status(200).json(getComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.session.post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
