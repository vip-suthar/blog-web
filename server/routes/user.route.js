const router = require("express").Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");

router.get("/user", async (req, res) => {
  try {
    const userId = res.locals.userId;
    if (!userId) {
      res.status(401).json({ success: false, data: "Unauthorized" });
      return;
    }

    const user = await User.findById(userId).select("-password -_id");
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, data: "Internal Server Error" });
  }
});

module.exports = router;
