var express = require("express");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.body);
  console.log(req);
  let resObject = {};
  resObject["name"] = req.file.originalname;
  resObject["type"] = req.file.mimetype;
  resObject["size"] = req.file.size;
  res.json(resObject);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
