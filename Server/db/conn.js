const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/Client-Doctor?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"


const connectToMongo = ()=>{
    
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },()=>{
        console.log("Connected to Mongo Successfully");
    })
}
module.exports = connectToMongo;



   /* useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log("DB CONNECTED.....")
  }).catch(() => {
    console.log("UNABLE to connect with the DB....")
  })*/