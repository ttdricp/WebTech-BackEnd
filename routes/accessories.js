const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.sendFile(process.cwd()+"/accessories.html"))
    .post((req, res) => res.send("POST ACCESSORIES"));
module.exports = router;