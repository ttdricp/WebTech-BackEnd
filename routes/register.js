const express = require("express");
const router = express.Router();
router
    .route("/")
    .get((req, res) => res.render(process.cwd()+"/views/register.ejs"))
    .post((req, res) => res.send("POST SignUp"));
module.exports = router;