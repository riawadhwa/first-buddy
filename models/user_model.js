const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const {Schema} = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    email:{ 
        type:String,
        required:true,
        unique:true,
        trim: true,
        validate: {
            validator: (value) => {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return value.match(re);
            },
            message: "Please enter a valid email address",
          },
    },
      
    num:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password:{
        type:String,
        required:true
    },
    address: {
        type: String,
        default: "",
    },
    dob:{
        type:String,
        default:""
    },
    position:{
        type: String,
        default:"",
    },
    feedback:{
        type: String,
        default:""
    }
});



userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};




const userModel = db.model('User',userSchema);

module.exports = userModel;