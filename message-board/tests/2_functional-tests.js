const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

let testThreadId = "";
let testThreadId2 = "";
let testReplyId = "";

suite("Functional Tests", function() {
  suite("Thread test", () => {
    test("Creating 2 new thread", done => {
      chai
        .request(server)
        .post("/api/threads/test4")
        .send({
          board: "test4",
          test: "testText",
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
        });

      chai
        .request(server)
        .post("/api/threads/test4")
        .send({
          board: "test4",
          test: "testText",
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
        });
      done();
    });

    test("Viewing the 10 most recent threads with 3 replies each", done => {
      chai
        .request(server)
        .get("/api/threads/test4")
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isBelow(res.body.length, 11);
          assert.isBelow(res.body[0].replies.length, 4);
          assert.isArray(res.body);
          testThreadId = String(res.body[0]._id);
          testThreadId2 = String(res.body[1]._id);
          done();
        });
    });

    test("Deleting a thread with the incorrect password", done => {
      chai
        .request(server)
        .delete("/api/threads/test4")
        .send({
          delete_password: "invalid password",
          thread_id: testThreadId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "incorrect password");
          done();
        });
    });

    test("Deleting a thread with the correct password", done => {
      chai
        .request(server)
        .delete("/api/threads/test4")
        .send({
          delete_password: "valid password",
          thread_id: testThreadId2
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "success");
          done();
        });
    });

    test("Reporting a thread", done => {
      chai
        .request(server)
        .put("/api/threads/test4")
        .send({
          thread_id: testThreadId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "success");
          done();
        });
    });
  });

  suite("Reply test", () => {
    test("Creating a new reply", done => {
      chai
        .request(server)
        .post("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          text: "test text",
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);

          done();
        });
    });

    test("Viewing a single thread with all replies", done => {
      chai
        .request(server)
        .get("/api/replies/test4")
        .query({
          thread_id: testThreadId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body.replies);
          testReplyId = res.body.replies[0]._id;

          done();
        });
    });

    test("Reporting a reply", done => {
      chai
        .request(server)
        .put("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "success");

          done();
        });
    });

    test("Deleting a reply with the incorrect password", done => {
      chai
        .request(server)
        .delete("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId,
          delete_password: "invalid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "incorrect password");

          done();
        });
    });

    test("Deleting a reply with the correct password", done => {
      chai
        .request(server)
        .delete("/api/replies/test4")
        .send({
          thread_id: testThreadId,
          reply_id: testReplyId,
          delete_password: "valid password"
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.text, "success");

          done();
        });
    });
  });
});
