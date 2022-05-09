const express = require('express')
const app = express()
const ejs = require('ejs')
const port = 3000

app.set('view engine', 'ejs')
app.use('/styles',express.static(__dirname +'/styles'));
app.use('/fonts',express.static(__dirname +'/fonts'));
app.use('/images',express.static(__dirname +'/images'));

app.use("/", require("./routes/"));
app.use("/accessories", require("./routes/accessories"));
app.use("/about", require("./routes/about"));
app.use("/SignUp", require("./routes/signup"));
app.use("/SignIn", require("./routes/signin"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

const kittySchema = new mongoose.Schema({
    name: String
});

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'