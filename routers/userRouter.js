const express = require("express");
const router = express.Router();
const { register, login, search } = require("../controllers/userController");
const isLoggendIn = require("../middleware/isLoggedIn");
router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/search").post(isLoggendIn, search);

module.exports = router;
