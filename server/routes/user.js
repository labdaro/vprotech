const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const UserControllers = require('../controllers/user')
router.get("/", checkAuth, UserControllers.user_get);

router.post("/login", UserControllers.user_login);

module.exports = router;