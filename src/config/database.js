const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:Rishabh123@cluster0.wos0aih.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
