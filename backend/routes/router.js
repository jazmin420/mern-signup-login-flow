const express = require("express");
const {
  test,
  signup,
  signin,
  googleAuth,
} = require("../controllers/authController");
const { verifyFirebaseToken } = require("../middleware/verifyToken");
const { getUserData } = require("../controllers/userController");

const router = express.Router();

router.get("/test", test);

router.post("/api/signup", signup);

router.post("/api/signin", verifyFirebaseToken, signin);

router.post("/api/googleauth", verifyFirebaseToken, googleAuth);

router.get("/api/user/:_id", getUserData);

module.exports = router;
