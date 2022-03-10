const express = require('express');
//const mongoose = require("mongoose")
const { join } = require('path');
const compression = require('compression');
const connectToMongo = require('./db/conn');
const dotenv = require('dotenv');
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const router = require('./routes');
const bcryptjs = require('bcryptjs');
require("dotenv").config();


connectToMongo();

const app = express()
//const port = 4000

const Users = require('./models/userSchema');
const Message = require('./models/msgSchema');
const authenticate = require('./middleware/authenticate')


dotenv.config({path : './config.env'});
require('./db/conn');



// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
  
app.use([
  compression(),
  express.json(),
  express.urlencoded({ extended: false }),
]);


const doctors = require('./routes/doctors');
const appointments = require("./routes/appointments")

app.use('/doctors', doctors);
app.use('/appointments', appointments);

//app.use('/api/v1', router);

app.use(express.static(join(__dirname, '..', 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
});

app.get('/', (req, res)=>{
  res.send("Hello World");
})


// Registration
app.post('/register', async (req, res)=>{
  try {
      // Get body or Data
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;

      const createUser = new Users({
          username : username,
          email : email,
          password : password
      });

      // Save Method is Used to Create User or Insert User
      // But Before Saving or Inserting, Password will Hash 
      // Because of Hashing. After Hash, It will save to DB
      const created = await createUser.save();
      res.json(created);
     // console.log(created);
     // res.status(200).send("Registered");

  } catch (error) {
      res.status(400).send(error)
  }
})

// Login User
app.post('/login', async (req, res)=>{
  try {
      const email = req.body.email;
      const password = req.body.password;

      // Find User if Exist
      const user = await Users.findOne({email : email});
      if(user){
          // Verify Password
          const isMatch = await bcryptjs.compare(password, user.password);

          if(isMatch){
              // Generate Token Which is Define in User Schema
              const token = await user.generateToken();
              res.cookie("jwt", token, {
                  // Expires Token in 24 Hours
                  expires : new Date(Date.now() + 86400000),
                  httpOnly : true
              })
              res.json(user);
             // res.status(200).send("LoggedIn")
          }else{
              res.status(400).send("Invalid Credentials");
          }
      }else{
          res.status(400).send("Invalid Credentials");
      }

  } catch (error) {
      res.status(400).send(error);
  }
})

// Message
app.post('/message', async (req, res)=>{
  try {
      // Get body or Data
      const name = req.body.name;
      const email = req.body.email;
      const message = req.body.message;

      const sendMsg = new Message({
          name : name,
          email : email,
          message : message
      });

      // Save Method is Used to Create User or Insert User
      // But Before Saving or Inserting, Password will Hash 
      // Because of Hashing. After Hash, It will save to DB
      const created = await sendMsg.save();
      res.json(created);
      //console.log(created);
     // res.status(200).send("Sent");

  } catch (error) {
      res.status(400).send(error)
  }
})

// Logout Page
app.get('/logout', (req, res)=>{
  res.clearCookie("jwt", {path : '/'})
  res.status(200).send("User Logged Out")
})

// Authentication
app.get('/auth', authenticate, (req, res)=>{

})

module.exports = app;



