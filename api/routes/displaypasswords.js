const router = require("express").Router();
const User = require("../models/users");
const Password = require("../models/password");
const { log } = require("console");
// registering users
router.get("/", async (req, res) => {
  //   log(
  //     req.body.loginusername ==
  //       User.find({ loginusername: req.body.loginusername })
  //   );
  //   log(User.find({ loginusername: req.body.loginusername }));
//   if (!User.find({"loginusername": req.body.loginusername})) {
//     log("yes");
//   }
  if (req.body.loginusername == req.query["user"]) {
    try {
      password = await Password.find({ whose: req.query["user"] });
        // log(User.find({loginusername: req.body.loginusername}));
      res.status(200).json(password);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("You must be logged in");
  }
});
module.exports = router;
