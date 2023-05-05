const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const user = require('./models/User');
const post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' })
const fs = require('fs');
const port = process.env.PORT || 4000;
const host = "localhost";
const salt = bcrypt.genSaltSync(10);
const secSalt = 'djsiaodnduqwip938';

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+ '/uploads'));
//2:38:41
//trial to fix chrome
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // replace with the address of your frontend
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
    next();
});


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
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await user.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);
    //creating a token
    if (passOk) {
        //logged in 
        jwt.sign({ username, id: userDoc._id }, secSalt, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    } else {
        res.status(400).json('wrong credentials');
    }
});

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secSalt, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});
// logout 
app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
});
//create post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    //uploading file and renaming file
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext
    fs.renameSync(path, newPath);
    
    const { token } = req.cookies;
    jwt.verify(token, secSalt, {}, async (err, info) => {
        if (err) throw err;
        const { title, summary, content } = req.body;
        const postDoc = await post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });
        res.json(postDoc);
    });
});

//posting the posts
app.get('/post', async (req, res) => {
    res.json(
        await post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(35)
        );
});

//single post
app.get('/post/:id', async (req ,res) => {
    const {id} = req.params;
    const postDoc = await post.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

//edit the post 
app.put('/post', uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if(req.file){
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath);    
    }
    const {token} = req.cookies;
    jwt.verify(token, secSalt, {}, async (err, info) => {
        if (err) throw err;
        
        const { id, title, summary, content } = req.body;
        const filter = { _id: id, author: info.id };
        const postDoc = await post.findById(id)
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if(!isAuthor) {
            res.status(400).json(
                'you are not the author'
            )
        }
        const update = {
            title, 
            summary, 
            content,
            cover: newPath ? newPath: postDoc.cover,
        };
        const updatedPost = await post.findOneAndUpdate(filter, update , { new: true })
        
        res.json(postDoc);
    });
});

//delete a single post 
app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    const { token } = req.cookies;
  
    jwt.verify(token, secSalt, {}, async (err, info) => {
      if (err) throw err;
  
      const postDoc = await post.findById(id);
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(403).json({ error: 'You are not authorized to delete this post' });
      }
  
      try {
        // delete the post and remove its cover image from the file system
        await postDoc.deleteOne();
        fs.unlinkSync(postDoc.cover);
        res.json({ message: 'Post deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to delete post' });
      }
    });
  });
  
//listen
app.listen(port, () => {
    console.log(`App listening at http://%s:%s`, host, port);
});
