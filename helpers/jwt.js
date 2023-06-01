const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  // JWT'yi oluşturmak için kullanılacak gizli anahtar (secret key)
  const secretKey = process.env.JWT_SECRET_KEY;

  // Token'ı oluşturun ve geri döndürün
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: "1h" });

  return token;
};

module.exports = generateToken;
