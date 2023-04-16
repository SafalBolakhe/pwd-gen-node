const router = require("express").Router();
const User = require("../models/users");
const bcrypt = require("bcrypt");
// registering users
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});
// logging user in
router.post("/login", async (req, res) => {
  try {
    if ((req.body.username && req.body.password) != "") {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        res.status(400).json("Wrong Credentials");
      } else {
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
          res.status(400).json("Wrong Credentials");
        } else {
          res.status(200).json(user);
        }
      }
    } else {
      res.status(400).json("Input both Credentials");
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
