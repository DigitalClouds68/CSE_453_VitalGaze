const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");


router.get('/profile', authMiddleware, userController.getProfile);
router.put("/username", authMiddleware, userController.changeUsername);
router.put("/password", authMiddleware, userController.changePassword);
router.put("/email", authMiddleware, userController.changeEmail);

module.exports = router;
