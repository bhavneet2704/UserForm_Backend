const mongoose = require("mongoose");//import mongoose which will help in connecting backend with frontent

mongoose.connect("mongodb://localhost:27017/userRegistration", {
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`connection failed`)
})