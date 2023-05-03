const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./models/User')
const port = process.env.PORT || 4000;
const host = "localhost";

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/finalProject",
    {
        dbName: "finalProject",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.create({ username, password })
    res.json(userDoc);
})
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});
// mongodb://localhost:27017