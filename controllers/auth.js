const mongoose = require("mongoose");
const User = require("../models/user"); // User modelinin dosya yolunuza göre düzenleyin
const generateToken = require("../helpers/jwt");
const nodemailer = require("nodemailer");

const register = async (req, res, next) => {
  try {
    // POST isteğiyle gelen verileri kullanarak yeni bir kullanıcı oluşturun
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    });

    //console.log(newUser);

    //veritabanında aynı maille kayıt olmuş kullanıcı varsa kayıt işlemi başarısız olmalı
    if (await User.findOne({ email: req.body.email })) {
      //console.log(ramo);
      throw 400;
    }

    // Yeni kullanıcıyı veritabanına kaydedin
    const savedUser = await newUser.save();
    const token = generateToken(savedUser.id);
    res
      .cookie("jsonwebtoken", token, { httpOnly: true })
      .json({ message: "user registered successful", user: savedUser });
  } catch (error) {
    if (error === 400) {
      res.status(400).json({
        success: false,
        message:
          "There is another user with the same email. Please try registering again with another email address.",
      });
    } else {
      res.status(500).json({ error: "Error occurred while registering user" });
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let token;
  let user;
  try {
    user = await User.findOne({ email: email });
    await user.comparePassword(password);
    //jsonwebtoken oluşturma
    token = generateToken(user.id);
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occurred while searching for user",
    });
  }

  //oluşturduğumuz tokenı istemciye cookie olarak gönderme
  res.status(200).cookie("jsonwebtoken", token, { httpOnly: true }).json({
    success: true,
    message: "user login confirmed",
    token: token,
  });
};

const forgotpassword = async (req, res) => {
  try {
    // Kullanıcının e-posta adresini alın
    const { email } = req.body;

    // E-posta gönderme işlemleri
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "{{yourmail@gmail.com}}",
        pass: "{{yourpass}}",
      },
      secure: false,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "{{yourmail@gmail.com}}",
      to: email,
      subject: "Şifre Sıfırlama",
      text: "Şifre sıfırlama bağlantısı: https://example.com/resetpassword", // Şifre sıfırlama bağlantısını buraya ekleyin
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "E-posta gönderme işleminde bir hata oluştu." });
  }
};

module.exports = {
  login,
  register,
  forgotpassword,
};
