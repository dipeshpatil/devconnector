const express = require("express");
const router = express.Router();

// Middlewares
const auth = require("../../middleware/auth");

// Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   GET api/profile/me
// @desc    Get current user's Profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ message: "Profile Doesn't Exist" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
