const express = require('express');
const router = express.Router();
const UserCtrl = require('../controller/userController');

router.post("/register", UserCtrl.register);
router.post("/login", UserCtrl.login);

module.exports = router; 