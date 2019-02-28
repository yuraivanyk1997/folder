const mongoose = require("../db");
const Scheme = mongoose.Schema;


const listScheme = new Scheme({
  userId : String,
  content : String
});

const List = mongoose.model("List", listScheme);

module.exports = List;
