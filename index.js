const app =require('./app');
const db = require('./config/db');
const userModel = require("./models/user_model");
const empModel = require("./models/file_model");

const port = 3001;

app.listen(port,()=>{
    console.log(`Server listen on http://localhost:${port}`);
});
