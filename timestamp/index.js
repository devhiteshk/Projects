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

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

let responseObject = {};

app.get("/api/", function (req, res) {
  responseObject = {};
  let r = new Date().getTime();
  responseObject["unix"] = r;
  responseObject["utc"] = new Date().toUTCString();
  res.json(responseObject);
});

app.get("/api/:date?", function (req, res) {
  let input = req.params.date;
  if (input.includes("-")) {
    let d = new Date(input).getTime();
    responseObject["unix"] = d;
    responseObject["utc"] = new Date(input).toUTCString();
  } else {
    input = parseInt(input);
    responseObject["utc"] = new Date(input);
  }

  if (!responseObject["unix"] || !responseObject["utc"]) {
    responseObject.json({ error: "invalid date" });
  }

  res.json(responseObject);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
