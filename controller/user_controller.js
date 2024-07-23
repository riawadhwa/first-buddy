const UserService = require('../services/user_services');


function extractValidationErrors(error) {
    const validationErrors = {};
    for (const field in error.errors) {
        if (error.errors[field].kind === 'user defined') {
            validationErrors[field] = error.errors[field].message;
        }
    }
    return validationErrors;
}


exports.register = async(req,res,next)=>{
    try{
const {name,email,num,password} = req.body;
const successRes = await UserService.registerUser(name,email,num,password);

res.json({status:true,success:`${email} User Registered Success`})
    }catch (error) {
        if (error.name === 'ValidationError') {
            // If it's a Mongoose validation error, extract error messages.
            const validationErrors = extractValidationErrors(error);
            res.status(400).json({ errors: validationErrors });
        } else {
            // For other errors, send a general error response.
            res.status(500).json({ error: error.message });
        }
    }

}


exports.login = async(req,res,next)=>{
    try{
const {email,password} = req.body;
const user = await UserService.checkUser(email);
console.log("----------------user---------",user)
if(!user){
    throw new Error("User Dont Exist");
}
const isMatch = await user.comparePassword(password);
if(isMatch == false){
    throw new Error("Password is invalid");
}

let tokenData = {_id:user._id,email:user.email};

const token = await UserService.generateToken(tokenData,"secretKey","1h");

res.status(200).json({status:true,token:token});
 
    }catch(err){
        throw err;
    }

}


exports.feedback = async(req,res) => {
    try{
        const {email,feedback} = req.body;
        const user = await UserService.checkUser(email);
        if(!user){
            throw new Error("User Dont Exist");
        }
        user.feedback = feedback;
        const updatedUser = await user.save();
        res.json({status:true,success:`feedback saved`})

    }catch(error){
        console.error(error); // Log the error for debugging purposes

        res.status(500).json({
            status: false,
            error: 'Internal Server Error',
        });

    }
}
