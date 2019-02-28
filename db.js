const mongoose = require("mongoose");

console.log("db");
mongoose.connect(
  "mongodb://localhost:27017/listUsers",
  { useNewUrlParser: true }
);
module.exports = mongoose;
