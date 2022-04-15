const express = require('express')
const app = express()
    const port = 3000

app.use('/styles',express.static(__dirname +'/styles'));

app.use("/", require("./routes/"));
app.use("/accessories", require("./routes/accessories"));
app.use("/about", require("./routes/about"));

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`)
);