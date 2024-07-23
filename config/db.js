const mongoose = require('mongoose');

const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/first_buddy").on('open',()=>{
    console.log("mongoDB Connected");
}).on("error", ()=>{
    console.log("MongoDB Connection Failed");
});
module.exports = connection;