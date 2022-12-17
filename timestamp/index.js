// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

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

// // your first API endpoint...
// app.get("/api/hello", function (req, res) {
//   res.json({ greeting: "hello API" });
// });

app.get("/api/", function (req, res) {
  let responseObject = {};
  let r = new Date().getTime();
  responseObject["unix"] = r;
  responseObject["utc"] = new Date().toUTCString();
  res.json(responseObject);
});

app.get("/api/:date?", function (req, res) {
  let user_input = req.params.date;
  let date;
  let res_obj = {};

  if (typeof (user_input == "string")) {
    if (Number(user_input) == user_input) {
      date = new Date(Number(user_input));
    } else {
      date = new Date(user_input);
    }
    if (!isNaN(date)) {
      res_obj["unix"] = date.getTime();
      res_obj["utc"] = date.toUTCString();
    } else {
      res_obj["error"] = "Invalid Date";
    }
    res.json(res_obj);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
