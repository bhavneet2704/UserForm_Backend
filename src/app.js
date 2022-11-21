const express = require("express");   //import express framework
const path = require("path");

const app = express();
const hbs = require("hbs"); //import hbs
require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 3000;
console.log(path.join(__dirname, "../public")); 

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");   // template path
const partials_path = path.join(__dirname, "../templates/partials");  // partials path

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine", "hbs");    //declaring hbs
app.set("views", template_path);   //declaring templates views
hbs.registerPartials(partials_path);   //declare partials diff method for reusable components

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        //console.log(password+" "+cpassword);
        //res.send(password+" "+cpassword);

        if(password === cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname  : req.body.lastname,
                email     : req.body.email,
                gender    : req.body.gender,
                phone     : req.body.phone,
                age       : req.body.age,
                password  : password,
                confirmpassword: cpassword
            })
            const registered = await registerEmployee.save();
                res.status(201).render("thanks");
                // console.log(password+" "+cpassword);
                // res.send(password+" "+cpassword);
        }else{
            res.send(password+" "+cpassword);
            res.send("passwords are not matching")
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`)
});

//Framework - Jiske andar pehle se bohat saare libraries, functions, modules, prebuilt variables
//MERN ka framework - Express
//Library - Reduce lines of code
//MERN STACK - MONGODB, EXPRESS, REACT, NODE 
//Template tag = ${}
//Nodemon helps you to see live changes

//hbs - template