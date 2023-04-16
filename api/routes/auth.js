const router = require("express").Router();
const { log } = require("console");
const users = require("../models/users");
const User = require("../models/users");
const bcrypt = require("bcrypt");
// registering users
router.post("/register", async (req, res) => {
  try {
    const tempuser = await User.findOne({
      loginusername: req.body.loginusername,
    });
    if (tempuser) {
      res.status(400).json("User Exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.loginpassword, salt);
    const newUser = new User({
      loginusername: req.body.loginusername,
      loginpassword: hashedPassword,
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
    if ((req.body.loginusername && req.body.loginpassword) != "") {
      const user = await User.findOne({ loginusername: req.body.loginusername });
      if (!user) {
        res.status(400).json("Wrong Credentials");
      } else {
        const match = await bcrypt.compare(req.body.loginpassword, user.loginpassword);
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
