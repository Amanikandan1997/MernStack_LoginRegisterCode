const express  = require('express');
const bcrypt    = require('bcrypt');
const dotenv      = require("dotenv");
const jwt        = require('jsonwebtoken');
const mongoose    = require('mongoose');
const bodyParser   = require('body-parser')
const cors          = require('cors');
const nodemailer = require('nodemailer');
// Initialize the server and port



//dotenv config
require ('dotenv').config()

const app      = express();

//get method checked
app.get ('/', (req, res) => {res.send ("Hi iam  a server")});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//cors  middleware
app.use (cors({origin:"http://localhost:3000",Credential:true }));



// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);



// Register Route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


  
  // Login route
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const validPassword = await bcrypt.compare(password, user.password);
  
      if (!validPassword) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // app.js




// Import required packages and models

// User route for fetching user details
app.get('/user', authenticateToken, async (req, res) => {
    try {
      // Find the user by ID using the information from the JWT payload
      const user = await User.findById(req.user.userId);
      
      // Return user details
      res.json({
        name: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Middleware function to authenticate token
  function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    jwt.verify(token.split(' ')[1], 'secret', (err, user) => {
      if (err) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  }
  


// Mount the user routes

const PORT=  process.env.PORT;
//port is running on the port
app.listen(PORT, () => console.log (`Server running on  ${PORT}` ));
//body parser middleware is used for parsing request body
app.use (express.json());

// Connect to MongoDB database using Mongoose ODM
mongoose.connect(process.env.DATABASE,{ useNewurlParser:true ,useUnifiedTopology:true} )
 
        .then(()=> console.log("Database Connected",process.env.DATABASE))
        .catch((err)=>console.log(err));