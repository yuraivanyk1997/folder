const mongoose = require("../db");
const Scheme = mongoose.Schema;
console.log("scheme" + mongoose);
const userScheme = new Scheme({
  name: String,
  password: String
});

const User = mongoose.model("Users", userScheme);

module.exports = User;
