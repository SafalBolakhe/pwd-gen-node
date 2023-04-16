const generator = require("generate-password");
const router = require("express").Router();
const User = require("../models/users");
const PasswordField = require("../models/password");
const { log } = require("console");
// registering users
router.post("/:id", async (req, res) => {
  try {
    if (User.findById(req.params.id)) {
      const user = await User.findById(req.params.id);
      //   console.log(user.username);
      //   console.log(req.params.id);
      const passwordfor = await req.body.passwordfor;
      const username = await req.body.username;
      //   log(username);
      const password = await req.body.password;
      //   log(password);
      const newUserPass = new PasswordField({
        passwordfor: passwordfor,
        username: username,
        password: password,
        whose: user.username,
      });
      //   log(newUserPass);
      try {
        const newData = await newUserPass.save();
        res.status(200).json(newData);
      } catch (error) {
        res.status(500), json(error);
      }
    }
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
