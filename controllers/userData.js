const User = require("../models/user");

const addBalance = async (req, res, next) => {
  const userId = req.user.id; // Kullanıcı kimliğini alın
  const amount = req.body.balance; // Artırılacak miktarı alın

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: amount } }, // Bakiyeyi artırmak için $inc operatörünü kullanın
      { new: true } // Güncellenmiş kullanıcıyı döndürmesi için { new: true } seçeneğini belirtin
    );

    if (user) {
      res.status(200).json({
        message: "Bakiye başarıyla güncellendi.",
        balance: user.balance,
        data: user,
      });
    } else {
      res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Bakiye güncelleme işleminde bir hata oluştu.",
      message: error,
    });
  }
};
const reductBalance = async (req, res, next) => {
  const userId = req.user.id; // Kullanıcı kimliğini alın
  const amount = req.body.balance; // Artırılacak miktarı alın

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: -amount } }, // Bakiyeyi artırmak için $inc operatörünü kullanın
      { new: true } // Güncellenmiş kullanıcıyı döndürmesi için { new: true } seçeneğini belirtin
    );

    if (user) {
      res.status(200).json({
        message: "Bakiye başarıyla güncellendi.",
        balance: user.balance,
        data: user,
      });
    } else {
      res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Bakiye güncelleme işleminde bir hata oluştu.",
      message: error,
    });
  }
};
module.exports = {
  addBalance,
  reductBalance,
};
