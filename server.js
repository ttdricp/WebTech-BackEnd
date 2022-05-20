const express = require('express')
const app = express()
const ejs = require('ejs')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const dbConfig = require('./config/database.config.js');

const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");

const User = require("./app/model/user");

const authenticateUser = require("./middlewares/authenticateUser");

require('./middleware')(app);

// cookie session
app.use(
    cookieSession({
        keys: ["randomStringASyoulikehjudfsajk"],
    })
);

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.use(express.static("views"))

app.set('view engine', 'ejs')
app.use('/styles',express.static(__dirname +'/styles'));
app.use('/fonts',express.static(__dirname +'/fonts'));
app.use('/images',express.static(__dirname +'/images'));

app.use("/", require("./routes/"));

app.use("/accessories", require("./routes/accessories"));
app.use("/about", require("./routes/about"));
app.use("/SignUp", require("./routes/register"));
app.use("/SignIn", require("./routes/login"));

app
    .get("/", (req, res) => {
        res.render("index");
    })
    .get("/login", (req, res) => {
        res.render("login");
    })
    .get("/register", (req, res) => {
        res.render("register");
    })
    .get("/home", authenticateUser, (req, res) => {
    res.render("home", { user: req.session.user });
});

// route for handling post requirests
app
    .post("/login", async (req, res) => {
        const { email, password } = req.body;

        // check for missing filds
        if (!email || !password) return res.send("Please enter all the fields");

        const doesUserExits = await User.findOne({ email });

        if (!doesUserExits) return res.send("invalid username or password");

        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
        );

        if (!doesPasswordMatch) return res.send("invalid username or password");

        // else he\s logged in
        req.session.user = {
            email,
        };

        res.redirect("/");
    })
    .post("/register", async (req, res) => {
        const {name, email, password, re_pass } = req.body;

        // check for missing filds
        if (!name || !email || !password || !re_pass) return res.send("Please enter all the fields");

        if (password != re_pass) return  res.send("Passwords doesn't match")

        const doesUserExitsAlready = await User.findOne({ email });

        if (doesUserExitsAlready) return res.send("A user with that email already exits please try another one!");

        // lets hash the password
        const hashedPassword = await bcrypt.hash(password, 12);
        const latestUser = new User({ name, email, password: hashedPassword, re_pass : hashedPassword });

        latestUser
            .save()
            .then(() => {
                res.redirect("/");
            })
            .catch((err) => console.log(err));
    });

//logout
app.get("/logout", authenticateUser, (req, res) => {
    req.session.user = null;
    res.redirect("/");
});


const UserRoute = require('./app/routes/User')
app.use('/user',UserRoute)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

