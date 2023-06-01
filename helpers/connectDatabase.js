const mongoose = require("mongoose");

const connectDatabase = () => {
  const mongoURI = process.env.MONGO_URI;

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB conn. successful");
    })
    .catch((err) => {
      console.error("MongoDB conn. Error:", err);
    });
};

module.exports = connectDatabase;
