"use strict";
let threadHandler = require("../controllers/threadHandler");
let replyHandler = require("../controllers/replyHandler");
let mongoose = require("mongoose");

module.exports = function(app) {
  app
    .route("/api/threads/:board")
    .post(threadHandler.postThread)
    .get(threadHandler.getThread)
    .delete(threadHandler.deleteThread)
    .put(threadHandler.putThread);

  app
    .route("/api/replies/:board")
    .post(replyHandler.postReply)
    .get(replyHandler.getReply)
    .delete(replyHandler.deleteReply)
    .put(replyHandler.putReply);
};
