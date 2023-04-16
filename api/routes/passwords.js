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
        // log(username);
      const password = await req.body.password;
        // log(password);
      const newUserPass = new PasswordField({
        passwordfor: passwordfor,
        username: username,
        password: password,
        whose: user.loginusername,
      });
        // log(newUserPass);
      try {
        const newData = await newUserPass.save();
        log(newData);
        res.status(200).json(newData);
      } catch (error) {
        res.status(500), json(error);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
