const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  const { password, username } = req.body;

  try {
    const user = new User({ password, username });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.json({ success: true, data: { token, username } });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    if (!username || !password) {
      return res
        .status(422)
        .send({ success: false, data: "Must provide username and password" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(422)
        .send({ success: false, data: "Invalid password or username" });
    }
    const match = await user.comparePassword(password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, data: "Invalid password or username" });
      
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.json({ success: true, data: { token, username } });
  } catch (err) {
    return res.status(500).send({ error: "Invalid password or username" });
  }
});

module.exports = router;
