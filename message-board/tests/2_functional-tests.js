const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test("Creating a new thread: POST request to /api/threads/{board}", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                assert.hasAllKeys(data.body, ["_id", "board", "text", "created_on"]);
                done();
            })
    })
    test("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", (done) => {
        chai.request(server)
            .get("/api/threads/charliecatxph_test")
            .end((err, data) => {
                assert.isNull(err);
                assert.isAtMost(data.body.length, 10);
                assert.isAtMost(data.body[0].replies.length, 3)
                done();
            })
    })
    test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_DEL1",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .delete("/api/threads/charliecatxph_test")
                    .send({
                        thread_id: data.body._id,
                        delete_password: "helloworldx"
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.equal(data.text, "incorrect password")
                        done();
                    })
            })
    })
    test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_DEL2",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .delete("/api/threads/charliecatxph_test")
                    .send({
                        thread_id: data.body._id,
                        delete_password: "helloworld"
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.equal(data.text, "success")
                        done();
                    })
            })
    })
    test("Reporting a thread: PUT request to /api/threads/{board}", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_RPT1",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .put("/api/threads/charliecatxph_test")
                    .send({
                        board: "charliecatxph_test",
                        thread_id: data.body._id
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.equal(data.text, "reported")
                        done();
                    })
            })
    })
    test("Creating a new reply: POST request to /api/replies/{board}", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_REP1",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .post("/api/replies/charliecatxph_test")
                    .send({
                        board: "charliecatxph_test",
                        thread_id: data.body._id,
                        text: "test_reply_ctx",
                        delete_password: "helloworld"
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.hasAllKeys(data.body, ["_id", "text", "created_on", "bumped_on", "replies"]);
                        assert.isAtLeast(data.body.replies.length, 1)
                        done();
                    })
            })
    })
    test("Viewing a single thread with all replies: GET request to /api/replies/{board}", (done) => {
        chai.request(server)
            .get("/api/replies/charliecatxph_test")
            .end((err, data) => {
                assert.isNull(err);
                assert.hasAllKeys(data.body[0], ["_id", "text", "created_on", "bumped_on", "replies", "replycount"]);
                done();
            })
    })

    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_DEL1",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .post("/api/replies/charliecatxph_test")
                    .send({
                        board: "charliecatxph_test",
                        thread_id: data.body._id,
                        text: "test_reply_ctx",
                        delete_password: "helloworld"
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.hasAllKeys(data.body, ["_id", "text", "created_on", "bumped_on", "replies"]);
                        assert.isAtLeast(data.body.replies.length, 1);
                        chai.request(server)
                            .delete("/api/replies/charliecatxph_test")
                            .send({
                                thread_id : data.body._id,
                                reply_id : data.body.replies[0]._id,
                                delete_password : "wrongpassword"
                            })
                            .end((err, data) => {
                                assert.isNull(err);
                                assert.equal(data.text, "incorrect password");
                                done();
                            })
                        
                    })
            })
    })
    test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_DEL2",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .post("/api/replies/charliecatxph_test")
                    .send({
                        board: "charliecatxph_test",
                        thread_id: data.body._id,
                        text: "test_reply_ctx",
                        delete_password: "helloworld"
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.hasAllKeys(data.body, ["_id", "text", "created_on", "bumped_on", "replies"]);
                        assert.isAtLeast(data.body.replies.length, 1);
                        chai.request(server)
                            .delete("/api/replies/charliecatxph_test")
                            .send({
                                thread_id : data.body._id,
                                reply_id : data.body.replies[0]._id,
                                delete_password : "helloworld"
                            })
                            .end((err, data) => {
                                assert.isNull(err);
                                assert.equal(data.text, "success");
                                done();
                            })
                        
                    })
            })
    })
    test("Reporting a reply: PUT request to /api/replies/{board}", (done) => {
        chai.request(server)
            .post("/api/threads/charliecatxph_test")
            .send({
                board: "charliecatxph_test",
                text: "test_message_ctx_RPT2",
                delete_password: "helloworld"
            })
            .end((err, data) => {
                assert.isNull(err);
                chai.request(server)
                    .post("/api/replies/charliecatxph_test")
                    .send({
                        board: "charliecatxph_test",
                        thread_id: data.body._id,
                        text: "test_reply_ctx",
                        delete_password: "helloworld"
                    })
                    .end((err, data) => {
                        assert.isNull(err);
                        assert.hasAllKeys(data.body, ["_id", "text", "created_on", "bumped_on", "replies"]);
                        assert.isAtLeast(data.body.replies.length, 1);
                        chai.request(server)
                            .put("/api/replies/charliecatxph_test")
                            .send({
                                thread_id : data.body._id,
                                reply_id : data.body.replies[0]._id,
                            })
                            .end((err, data) => {
                                assert.isNull(err);
                                assert.equal(data.text, "reported");
                                done();
                            })
                        
                    })
            })
    })
});
