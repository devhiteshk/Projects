"use strict";
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

let uri =
  "mongodb+srv://admin:" +
  process.env.MDbP +
  "@memories.3ypawsz.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((e) => {
    console.log(e);
  });

const commentSchema = new Schema({
  text: { type: String },
  created_on: { type: Date, default: Date.now, immutable: true },
  delete_password: { type: String },
  reported: { type: Boolean, default: false },
});

const messageSchema = new Schema({
  board: { type: String, required: true },
  text: { type: String, required: true },
  delete_password: { type: String, required: true },
  created_on: { type: Date, default: Date.now, immutable: true },
  bumped_on: { type: Date, default: Date.now },
  replies: [commentSchema],
  reported: { type: Boolean, default: false },
  replycount: { type: Number, default: 0 },
});

const Message = mongoose.model("anon_messages", messageSchema);

module.exports = function (app) {
  app
    .route("/api/threads/:board")
    .get((req, res) => {
      const { board } = req.params;
      Message.find({ board: board }, (err, data) => {
        if (err) {
          res.send("Error.");
          return;
        } else {
          const a = data.map((data) => ({
            _id: data._id,
            text: data.text,
            created_on: data.created_on,
            bumped_on: data.bumped_on,
            replies: data.replies
              .sort((d1, d2) => d2.created_on - d1.created_on)
              .slice(0, 3)
              .map((d) => ({
                _id: d._id,
                text: d.text,
                created_on: d.created_on,
              })),
            replycount: data.replies.length,
          }));

          res.json(
            a.sort((d1, d2) => d2.bumped_on - d1.bumped_on).slice(0, 10)
          );
        }
      });
    })
    .post((req, res) => {
      const { board, text, delete_password } = req.body;
      const mainBoard = !board ? req.params.board : board;
      if (!mainBoard || !text || !delete_password) {
        res.send("Important fields missing.");
        return;
      }
      const hashPassword = bcrypt.hashSync(delete_password, 12);
      const message = new Message({
        board: mainBoard,
        text: text,
        delete_password: hashPassword,
      });

      message.save().then((d) => {
        res.json({
          _id: d._id,
          board: d.board,
          text: d.text,
          created_on: d.created_on,
        });
      });
    })
    .delete((req, res) => {
      const { thread_id, delete_password } = req.body;
      if (!thread_id || !delete_password) {
        res.send("Important fields missing.");
        return;
      }

      let object_id;
      try {
        object_id = ObjectId(thread_id);
        Message.findOne({ _id: object_id }, (err, data) => {
          if (err) {
            console.log("Error!");
            return;
          } else {
            if (!data) {
              res.send("thread doesn't exist");
            } else {
              if (bcrypt.compareSync(delete_password, data.delete_password)) {
                data.remove();
                res.send("success");
              } else {
                res.send("incorrect password");
              }
            }
          }
        });
      } catch (e) {
        res.send("Invalid _id.");
        return;
      }
    })
    .put((req, res) => {
      const { board, thread_id } = req.body;
      const mainBoard = !board ? req.params.board : board;
      const mainThread = !thread_id ? req.body.report_id : thread_id;

      if (!mainBoard || !mainThread) {
        res.send("Important fields missing.");
        return;
      }

      let object_id;
      try {
        object_id = ObjectId(mainThread);

        Message.findOne({ _id: object_id, board: mainBoard }, (err, data) => {
          if (err) {
            console.log("Error!");
            return;
          } else {
            if (!data) {
              res.send("Thread not found.");
              return;
            } else {
              data.reported = true;
              data.bumped_on = new Date();

              data.save().then((d) => {
                res.send("reported");
              });
            }
          }
        });
      } catch (e) {
        res.send("Invalid _id.");
        return;
      }
    });

  app
    .route("/api/replies/:board")
    .post((req, res) => {
      const { board, thread_id, text, delete_password } = req.body;
      const mainBoard = !board ? req.params.board : board;

      if (!mainBoard || !thread_id || !text || !delete_password) {
        res.send("Important fields missing.");
        return;
      }

      let object_id;
      const hashPassword = bcrypt.hashSync(delete_password, 12);
      try {
        object_id = ObjectId(thread_id);

        Message.findOne({ _id: object_id, board: mainBoard }, (err, data) => {
          if (err) {
            console.log(err);
            return;
          } else {
            if (!data) {
              res.send("Thread not found.");
              return;
            } else {
              data.bumped_on = new Date();
              data.replies.push({
                text: text,
                delete_password: hashPassword,
              });
              data.replycount = data.replycount + 1;

              data.save().then((d) => {
                res.json({
                  _id: d._id,
                  text: d.text,
                  created_on: d.created_on,
                  bumped_on: d.bumped_on,
                  replies: d.replies.map((d) => ({
                    _id: d._id,
                    text: d.text,
                    created_on: d.created_on,
                  })),
                });
              });
            }
          }
        });
      } catch (e) {
        res.send("Invalid _id.");
        return;
      }
    })
    .get((req, res) => {
      const { board } = req.body;
      const { thread_id } = req.query;
      const mainBoard = !board ? req.params.board : board;

      if (!mainBoard) {
        res.send("Important fields missing.");
        return;
      }
      if (!thread_id) {
        Message.find({ board: mainBoard }, (err, data) => {
          if (err) {
            console.log(err);
            return;
          } else {
            if (!data || data.length === 0) {
              res.send("Board is empty.");
              return;
            } else {
              res.json(
                data
                  .map((d) => ({
                    _id: d._id,
                    text: d.text,
                    created_on: d.created_on,
                    bumped_on: d.bumped_on,
                    replies: d.replies
                      .sort((d1, d2) => d2.created_on - d1.created_on)
                      .map((d) => ({
                        _id: d._id,
                        text: d.text,
                        created_on: d.created_on,
                      }))
                      .slice(0, 3),
                    replycount: d.replycount,
                  }))
                  .slice(0, 10)
              );

              return;
            }
          }
        });
      } else {
        let object_id;
        try {
          object_id = ObjectId(thread_id);
          Message.findOne({ _id: object_id, board: mainBoard }, (err, data) => {
            if (err) {
              console.log(err);
              return;
            } else {
              if (!data) {
                res.send("Thread not found.");
                return;
              } else {
                res.json({
                  _id: data._id,
                  text: data.text,
                  created_on: data.created_on,
                  bumped_on: data.bumped_on,
                  replies: data.replies.map((d) => ({
                    _id: d._id,
                    text: d.text,
                    created_on: d.created_on,
                  })),
                });
              }
            }
          });
        } catch (e) {
          res.send("Invalid _id.");
          return;
        }
      }
    })
    .delete((req, res) => {
      const { thread_id, reply_id, delete_password } = req.body;
      const { board } = req.params;

      if (!thread_id || !reply_id || !delete_password || !board) {
        res.send("Important fields missing.");
        return;
      }

      let main_objectId;
      let main_subdocumentId;
      try {
        main_objectId = ObjectId(thread_id);
        Message.findOne({ _id: main_objectId, board: board }, (err, data) => {
          if (err) {
            console.log("Error!");
            return;
          } else {
            if (!data) {
              res.send("Thread not found.");
              return;
            } else {
              try {
                main_subdocumentId = ObjectId(reply_id);

                const findSubdocument = data.replies.id(main_subdocumentId);

                if (
                  bcrypt.compareSync(
                    delete_password,
                    findSubdocument.delete_password
                  )
                ) {
                  data.bumped_on = new Date();
                  findSubdocument.reported = true;
                  findSubdocument.text = "[deleted]";

                  data.save().then((d) => {
                    res.send("success");
                  });
                } else {
                  res.send("incorrect password");
                }
              } catch (e) {
                res.send("Invalid reply id.");
                return;
              }
            }
          }
        });
      } catch (e) {
        res.send("Invalid _id");
        return;
      }
    })
    .put((req, res) => {
      const { thread_id, reply_id } = req.body;
      const { board } = req.params;

      if (!board || !thread_id || !reply_id) {
        res.send("Important fields missing.");
        return;
      }

      let main_objectId;
      let main_subdocumentId;
      try {
        main_objectId = ObjectId(thread_id);
        Message.findOne({ _id: main_objectId, board: board }, (err, data) => {
          if (err) {
            console.log("Error!");
            return;
          } else {
            if (!data) {
              res.send("Thread not found.");
              return;
            } else {
              try {
                main_subdocumentId = ObjectId(reply_id);

                const findSubdocument = data.replies.id(main_subdocumentId);

                if (!findSubdocument) {
                  res.send("Reply not found.");
                } else {
                  findSubdocument.reported = true;

                  data.save().then((d) => {
                    res.send("reported");
                  });
                }
              } catch (e) {
                res.send("Invalid reply id.");
                return;
              }
            }
          }
        });
      } catch (e) {
        res.send("Invalid _id");
        return;
      }
    });
};
