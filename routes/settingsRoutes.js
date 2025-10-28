const express = require('express');
const router = express.Router();
const SettingsCtrl = require('../controller/settingsController');
const verifyToken = require('../middleware/verifyToken');

router.get("/settings", verifyToken, SettingsCtrl.getSettings);
router.get("/test", SettingsCtrl.test);

module.exports = router; 