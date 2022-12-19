const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const { response } = require("express");

const uri = process.env.URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const exerciseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  log: [exerciseSchema],
});

let Session = mongoose.model("Session", exerciseSchema);
let User = mongoose.model("User", userSchema);

mongoose.set("strictQuery", false);

app.post("/api/users", (req, res) => {
  console.log("post users", req.body);
  let newUser = new User({ username: req.body.username });
  newUser.save((error, savedUser) => {
    if (!error) {
      let resObject = {};
      resObject["username"] = savedUser.username;
      resObject["_id"] = savedUser._id;
      res.json(resObject);
    } else {
      console.log(error);
    }
  });
});

app.get("/api/users", (req, res) => {
  console.log("get users", req.body);
  User.find({}, (error, arrayOfUsers) => {
    if (!error) {
      res.json(arrayOfUsers);
    }
  });
});

function validDate(d) {
  var x = new Date(d);

  return x instanceof Date && !isNaN(x);
}

// app.get("/api/users//exercises", (req, res) => {
//   res.json({ error: "user doesn't exist" });
// });

app.post("/api/users/:_id/exercises", (request, response) => {
  console.log("post api/id/ex", request.body);

  let newExerciseItem = new Session({
    description: request.body.description,
    duration: parseInt(request.body.duration),
    date: request.body.date,
  });

  // console.log(newExerciseItem.date);

  if (validDate(request.body.date)) {
    newExerciseItem.date = new Date(request.body.date).toDateString();
  } else if (request.body.date === "") {
    newExerciseItem.date = new Date().toDateString();
  } else {
    response.json({ error: "invalid date" });
  }

  User.findByIdAndUpdate(
    { _id: request.body[":_id"] },
    { $push: { log: newExerciseItem } },
    { new: true },
    (error, updatedUser) => {
      if (!error) {
        console.log(updatedUser);
        let responseObject = {};
        responseObject["_id"] = request.body[":_id"];
        responseObject["username"] = updatedUser.username;
        responseObject["date"] = new Date(newExerciseItem.date).toDateString();
        responseObject["duration"] = newExerciseItem.duration;
        responseObject["description"] = newExerciseItem.description;
        response.json(responseObject);
      }
    }
  );
});

app.get("/api/users/:_id/logs", (req, res) => {
  console.log("api/id/logs", req.body);
  let req_id = req.params._id;
  User.findById(req_id, (error, obt_user) => {
    if (!error) {
      let responseObject = {};
      responseObject["_id"] = obt_user["_id"];
      responseObject["username"] = obt_user["username"];
      responseObject["count"] = obt_user.log.length;
      responseObject["log"] = obt_user.log;

      if (req.query.from || req.query.to) {
        let fromDate = new Date(0);
        let toDate = new Date();

        if (req.query.from) {
          fromDate = new Date(req.query.from);
        }

        if (req.query.to) {
          toDate = new Date(req.query.to);
        }

        fromDate = fromDate.getTime();
        fromDate = toDate.getTime();

        responseObject.log = responseObject.log.filter((session) => {
          let sessionDate = new Date(session.date).getTime();
          return sessionDate >= fromDate || sessionDate <= toDate;
        });
      }
      if (req.query.limit) {
        responseObject.log = responseObject.log.slice(0, req.query.limit);
      }

      res.json(responseObject);
    }
  });
});
