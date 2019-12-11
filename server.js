const express = require("express"); //import express
const mongoose = require("mongoose");
const messageModel = require("./models/message");
const userModel = require("./models/user");
const bodyParser = require("body-parser");
//const flash = require('express-flash-notification');
//const cookieParser = require("cookie-parser");
//const session = require("express-session");
//const popup = require("popups");


const connectionString =
"mongodb+srv://Admin:Admin@cluster0-6tzn1.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(
    connectionString,
    { useNewUrlParser: true, useUnifiedTopology: true},

    err =>{
        console.log(err);
    }
);
const app = express (); // create an express app
const user = {
    username:"okike",
    password:"okike"
};

app.use(bodyParser.json()),
app.use(bodyParser.urlencoded({extended: true})),
//app.use(cookieParser()),
//app.use(session({secret:'shh'})),
//app.use(flash(app));

app.post("/login", (req, res) => {
    // console.log(req.body);
    if( req.body.username === user.username && req.body.password === user.password){
        res.send(`Hi ${req.body.username} your ${req.body.subject} form has been completed`);

    } else {
        res.send("Thats not the right details dawg");
    }
    
}), // create a login route

app.post("/contactus", (req, res) => {
   
      const message = new messageModel({
        email: req.body.email,
        comments: req.body.comments
      });
    
      message.save((err,doc) =>{
          if (err !== null){
              console.log(err);
              res.send("Falied to contact us. please try again."); 
          }else{
            console.log(doc);
          // popup.alert({
            //content:'Thanks for reaching out. we will contact you shortly'
           // });
         res.send("Thanks for reaching out. we will contact you shortly"); 
       
          }
      });


}), // create a contact us route

app.post("/signin", (req, res) => {
   
    const user = new userModel({
        service:req.body.service,
        fullname:req.body.fullname,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
    
  
    user.save((err,doc) =>{
        if (err !== null){
            console.log(err);
            res.send("Falied to Sign in. please try again."); 
        }else{
          console.log(doc);
          res.send("Thanks for Sigining up. we will redirect you soon."); 
        }
    });


}), // create a Sign in route

app.get("/read-users", (req, res)=>{
userModel.find({},(err,docs)=>{
if(err !== null){
    console.log(err);
    res.send("Failed to fetch messages");
}else{
    res.send(docs);
}

})

})

app.listen(3000, () => console.log("server running at  port 3000"))
 // expose the app on port 3000
