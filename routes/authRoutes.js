const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controller/authController');
const verifyToken = require('../middleware/verifyToken');

router.post("/forgot-password", verifyToken, AuthCtrl.forgotPassword);
router.post("/verify-otp", verifyToken, AuthCtrl.verifyOtp);
router.post("/change-password", verifyToken, AuthCtrl.changeNewPassword);

module.exports = router; 