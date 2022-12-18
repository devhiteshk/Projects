require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

function isValidURL(string) {
  if (
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      string
    )
  ) {
    return true;
  } else {
    return false;
  }
}

function fileReadWrite(url) {
  var current_url = url;

  var flag = false;

  var obj = {
    urlCollection: [],
  };

  fs.readFile("db.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object

      obj.urlCollection.map((i) => {
        if (i.original_url === current_url) {
          updated_response["original_url"] = current_url;
          updated_response["short_url"] = String(i.short_url);
          flag = true;
          return updated_response;
        }
      });
      if (flag === false) {
        // console.log("i reached here");
        let Nshort_url =
          obj.urlCollection[obj.urlCollection.length - 1].short_url + 1;
        updated_response = { original_url: url, short_url: Nshort_url };
        obj.urlCollection.push({ original_url: url, short_url: Nshort_url }); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile("db.json", json, "utf8", () => {
          return updated_response;
        }); // write it back
      }
    }
  });
  return updated_response;
}

let resObject = {};

let updated_response = {};

app.post("/api/shorturl", function (req, res) {
  url = req.body.url;
  console.log(url);

  if (isValidURL(url) === false) {
    resObject["error"] = "invalid url";
    res.json(resObject);
  } else {
    fileReadWrite(url);
    setTimeout(function callback() {
      // console.log(updated_response);
      res.json(updated_response);
    }, 1000);
  }
});

app.get("/surl/", function (req, res) {
  fs.readFile("db.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      // console.log(req);
      obj = JSON.parse(data);
      res.json(obj.urlCollection);
    }
  });
});

app.get("/api/shorturl/:id", function (req, res) {
  let redirect = req.params.id;

  let ret_url = "";

  fs.readFile("db.json", "utf8", function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      obj = JSON.parse(data); //now it an object

      obj.urlCollection.map((i) => {
        if (i.short_url == redirect) {
          ret_url = i.original_url;
          return;
        }
      });
    }
  });
  setTimeout(function callback() {
    console.log(ret_url);
    if (ret_url === "") {
      res.json({ error: "No short URL found for the given input" });
    } else {
      res.redirect(ret_url);
    }
  }, 1000);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
