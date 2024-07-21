const bcryptjs = require("bcryptjs");
const User = require("../model/userModel");

exports.test = (req, res) => {
  res.json("API is working!!!");
};

exports.signup = async (req, res, next) => {
  const {
    username,
    email,
    password,
    coverPhoto,
    profilePicture,
    gender,
    educationLevel,
    phoneNumber,
  } = req.body;

  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      educationLevel,
      gender,
      profilePicture,
      coverPhoto,
    });

    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email });

    if (user) {
      if (!user.qrCodeGenerated) {
        const profileUrl = `https://signup-login-flow-mern.vercel.app/profile/${user._id}`;
        user.profileUrl = profileUrl;
        user.qrCodeGenerated = true;
        await user.save();
      }
      res.status(200).json({
        success: true,
        user,
      });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error handling signin:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.user;

  try {
    const user = await User.findOne({ email });

    if (user) {
      if (!user.qrCodeGenerated) {
        const profileUrl = `https://signup-login-flow-mern.vercel.app/profile/${user._id}`;
       user.profileUrl = profileUrl;
       user.qrCodeGenerated = true;
       await user.save();
     }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: name,
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();

      const { password, ...rest } = newUser._doc;

      res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};


