// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();
const IP = require("ip");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.enable("trust proxy");
// your first API endpoint...
app.get("/api/whoami", function (req, res) {
  let res_obj = {};
  res_obj["ipaddress"] = req.socket.remoteAddress;
  // res_obj["ipaddress"] = req.socket.remoteAddress;
  res_obj["language"] = req.headers["accept-language"];
  res_obj["software"] = req.headers["user-agent"];

  res.json(res_obj);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
