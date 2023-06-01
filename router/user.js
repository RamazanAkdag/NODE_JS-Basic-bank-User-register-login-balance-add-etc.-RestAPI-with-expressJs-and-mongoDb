const express = require("express");
const { default: mongoose } = require("mongoose");
const User = require("../models/user"); // User modelinin dosya yolunuza göre düzenleyin
const authenticateToken = require("../middlewares/jwtTokenControl");
const { addBalance, reductBalance } = require("../controllers/userData");
const router = express.Router();
let userId;
let user;
router.get("/", async (req, res, next) => {
  userId = req.user.id;
  user = await User.findById(userId);
  console.log(user);
  res.json({
    success: true,
    data: user,
  });
});

router.post("/balance/add", authenticateToken, addBalance);
router.post("/balance/reduct", authenticateToken, reductBalance);
module.exports = router;
