const express = require("express");
const user = require("./user");
const admin = require("./admin");
const auth = require("./auth");
const authenticateToken = require("../middlewares/jwtTokenControl");
const router = express.Router();

router.use("/auth", auth);
router.use("/user", authenticateToken, user);
router.use("/admin", admin);

module.exports = router;
