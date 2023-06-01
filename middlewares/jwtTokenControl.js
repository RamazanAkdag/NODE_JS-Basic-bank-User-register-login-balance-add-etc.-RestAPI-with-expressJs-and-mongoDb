const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

const authenticateToken = (req, res, next) => {
  // Token'i al
  let token = req.headers.authorization;

  token = token.split(" ")[1];

  // Token kontrolü
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  // Token doğrulama
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(decoded);
    // Token doğrulandı, decoded nesnesi içinde kullanıcı bilgileri bulunur
    req.user = decoded;

    // Sonraki middleware'e geç
    next();
  });
};

module.exports = authenticateToken;
