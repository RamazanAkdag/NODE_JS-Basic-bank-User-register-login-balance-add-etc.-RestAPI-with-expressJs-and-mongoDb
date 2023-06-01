const express = require("express");
const { register, login, forgotpassword } = require("../controllers/auth");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/forgotpassword", forgotpassword);

module.exports = router;
