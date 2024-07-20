const express = require('express');
const { test, signup, signin, googleAuth, getUserData } = require('../controllers/authController');
const { verifyFirebaseToken } = require('../middleware/verifyToken');



const router = express.Router();

//test
router.get('/test', test);

router.post('/api/signup', signup)

router.post('/api/signin', verifyFirebaseToken, signin)

router.post('/api/googleauth', verifyFirebaseToken, googleAuth)

router.get('/api/user/:_id', getUserData)

module.exports = router;