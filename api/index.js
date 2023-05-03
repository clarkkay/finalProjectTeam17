const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const user = require('./models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 4000;
const host = "localhost";
const salt = bcrypt.genSaltSync(10);
const secSalt = 'djsiaodnduqwip938';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

//connection
mongoose.connect("mongodb://127.0.0.1:27017/register",
    {
        dbName: "finalProject",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// creating a new user 
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const formData = new user({
        username, password: bcrypt.hashSync(password, salt), 
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

  //login
app.post('/login', async(req,res)=>{
    const{username, password} = req.body;
    const userDoc = await user.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    //creating a token
    if(passOk){
        //logged in 
        jwt.sign({username, id:userDoc._id}, secSalt, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json('ok');
        });
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if(err) throw err;
        res.json(info);
    })
});

app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});
// mongodb://localhost:27017