const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(process.cwd()+"/views/signin.ejs"))
    .post((req, res) => res.send("POST SignIn"));
module.exports = router;