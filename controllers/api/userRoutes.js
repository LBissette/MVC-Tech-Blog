const router = require('express').Router();
const { BlogPost, Comment, User } = require('../../models');
const bcrypt = require("bcrypt")
const session = require("express-session")

router.get("/", async (req, res) => {
  try {
      const users = await User.findAll({ include: [BlogPost, Comment], attributes: { exclude: "hashed_password" } });
      res.json(users);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.get("/id", (req, res) => {
  res.json(req.session.user_id);
});

router.get("/:id", async (req, res) => {
  try {
      const user = await User.findByPk(req.params.id, { include: [BlogPost, Comment], attributes: { exclude: "password" } });
      res.json(user);
  } catch (err) {
      res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      res.send("Logged in successfully!");
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.send("Logged out successfully!");
});

module.exports = router;
