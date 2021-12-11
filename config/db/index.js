const mongoose = require("mongoose");

let url = "mongodb+srv://anas:anas123@cluster0.ktmxq.mongodb.net/my_project?retryWrites=true&w=majority";

mongoose.connect(url);

module.exports = mongoose;