const mongodb = require("mongodb");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

mongoose.Promise = global.Promise;
let dbName = "SPCDB";
let uri =
  "mongodb+srv://admin:" +
  String(process.env.MDbP) +
  "@memories.3ypawsz.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
let db = mongoose.connection;
db.on("error", (err) => {
  console.error(err);
});
db.once("open", () => {
  console.log(`Connected to Database ${dbName}`);
});
process.on("SIGINT", () => {
  db.close(() => {
    console.log(`Closing connection to ${dbName}`);
    process.exit(0);
  });
});

module.exports = db;
