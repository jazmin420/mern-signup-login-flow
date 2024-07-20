const admin = require("../firebase");

const verifyFirebaseToken = async (req, res, next) => {
  const idToken = req.headers.authorization.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying Firebase ID token:", error.message);
    return res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = { verifyFirebaseToken };
