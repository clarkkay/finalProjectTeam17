const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const user = require('./models/User')
const port = process.env.PORT || 4000;
const host = "localhost";

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/register",
    {
        dbName: "finalProject",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const formData = new user({
        username, password 
    })
    try {
    await user.create(formData);
    const messageResponse = { message: `User ${username} added correctly` };
    res.send(JSON.stringify(messageResponse));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to create user' });
    }
  });
  
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});
// mongodb://localhost:27017