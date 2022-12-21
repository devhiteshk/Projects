let mongoose = require("mongoose");
//let mongodb = require("mongodb");
const dotenv = require("dotenv").config();
let uri =
  "mongodb+srv://admin:" +
  process.env.MDbP +
  "@memories.3ypawsz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let messageSchema = new mongoose.Schema({
  board: String,
  text: String,
  created_on: Date,
  bumped_on: Date,
  reported: Boolean,
  delete_password: String,
  replies: [
    {
      text: String,
      created_on: Date,
      delete_password: String,
      reported: Boolean,
    },
  ],
});

let Message = mongoose.model("message", messageSchema);

exports.Message = Message;
