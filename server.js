const express = require('express')
const app = express()
const ejs = require('ejs')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const bodyParser=require('body-parser');
const dbConfig = require('./config/database.config.js');

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


app.set('view engine', 'ejs')
app.use('/styles',express.static(__dirname +'/styles'));
app.use('/fonts',express.static(__dirname +'/fonts'));
app.use('/images',express.static(__dirname +'/images'));

app.use("/", require("./routes/"));
app.use("/accessories", require("./routes/accessories"));
app.use("/about", require("./routes/about"));
app.use("/SignUp", require("./routes/signup"));
app.use("/SignIn", require("./routes/signin"));

const UserRoute = require('./app/routes/User')
app.use('/user',UserRoute)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

