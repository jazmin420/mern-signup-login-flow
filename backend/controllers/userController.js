const User = require("../model/userModel");

exports.getUserData = async (req, res, next) => {
  try {
    const _id = req.params._id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};