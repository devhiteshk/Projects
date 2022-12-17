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
  let responseObject = {};
  let input = req.params;

  let d = new Date(input.date).valueOf();
  responseObject["unix"] = d;
  responseObject["utc"] = new Date(input.date).toUTCString();
  if (input.date.includes("-")) {
    res.json(responseObject);
  } else {
    let sec = Number(input.date);
    responseObject["unix"] = sec;
    responseObject["utc"] = new Date(sec).toUTCString();

    if (!responseObject["unix"] || !responseObject["utc"]) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json(responseObject);
    }
  }
});

// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
