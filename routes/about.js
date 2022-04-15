const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/about.html"))
    .post((req, res) => res.send("POST ABOUT"));
module.exports = router;