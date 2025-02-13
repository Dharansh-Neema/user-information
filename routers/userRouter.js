const express = require("express");
const router = express.Router();
const { register, login, search } = require("../controllers/userController");

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/search").post(search);

module.exports = router;
