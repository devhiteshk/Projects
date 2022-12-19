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
  console.log(req.body);
  let newUser = new User({ username: req.body.username });
  newUser.save((error, savedUser) => {
    if (!error) {
      let resObject = {};
      resObject["username"] = savedUser.username;
      resObject["_id"] = savedUser.id;
      res.json(resObject);
    } else {
      console.log(error);
    }
  });
});

app.get("/api/users", (req, res) => {
  User.find({}, (error, arrayOfUsers) => {
    if (!error) {
      res.json(arrayOfUsers);
    }
  });
});

app.post("/api/users/:_id/exercises", (request, response) => {
  console.log(request.body[":_id"]);

  let newExerciseItem = new Session({
    description: request.body.description,
    duration: parseInt(request.body.duration),
    date: request.body.date,
  });

  if (newExerciseItem.date === "") {
    newExerciseItem.date = new Date().toISOString().substring(0, 10);
  }

  User.findByIdAndUpdate(
    request.body[":_id"],
    { $push: { log: newExerciseItem } },
    { new: true },
    (error, updatedUser) => {
      if (!error) {
        let responseObject = {};
        responseObject["_id"] = updatedUser["_id"];
        responseObject["username"] = updatedUser.username;
        responseObject["description"] = newExerciseItem.description;
        responseObject["duration"] = newExerciseItem.duration;
        responseObject["date"] = new Date(newExerciseItem.date).toDateString();
        response.json(responseObject);
      }
    }
  );
});

app.get("/api/users/:_id/logs", (req, res) => {
  console.log(req.query.limit);
  let req_id = req.params._id;
  User.findById(req_id, (error, obt_user) => {
    if (!error) {
      let responseObject = {};
      responseObject["_id"] = obt_user.id;
      responseObject["username"] = obt_user.username;
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

        if (req.query.limit) {
          responseObject.log = responseObject.log.slice(0, req.query.limit);
        }
      }

      res.json(responseObject);
    }
  });
});