const router = require("express").Router();
const User = require("../models/users");
// updating users
router.put("/:id", async (req, res) => {
  try {
    const id = await req.params.id;
    res.json(id);
} catch (error) {
    res.status(500).json(error);
  }
});
// Deleing user
router.delete("/:id", async (req, res) => {
  try {
    const id = await req.params.id;
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
