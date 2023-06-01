const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({
    success: true,
    data: "selamss",
  });
});
module.exports = router;
