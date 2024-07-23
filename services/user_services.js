const userModel = require("../models/user_model");
        const jwt = require('jsonwebtoken');
        const bcrypt = require("bcrypt");
        
class UserService {

    static async registerUser(name, email, num, password) {
                try {
                    const existingUser = await userModel.findOne({ email });
                    if (existingUser) {
                        // Instead of returning res from the service, throw an error.
                        throw new Error("User with the same email already exists!");
                    }
        
                    const hashedPassword = await bcrypt.hash(password, 8);
        
                    let user = new userModel({
                        email,
                        password: hashedPassword,
                        num,
                        name,
                    });
                    user = await user.save();
        
                    // Instead of returning res from the service, return the user.
                    return user;
                } catch (e) {
                    // Throw the error to be handled in the route handler/controller.
                    throw e;
                }
            }
        






static async checkUser(email){
    try {
        return await userModel.findOne({email});
    } catch (error) {
        throw error;
    }
}

static async generateToken(tokenData,secretKey,jwt_expire){
    return jwt.sign(tokenData,secretKey,{expiresIn:jwt_expire});
}

static async updateUser(email, additionalDetails){
    const user = await userModel.findOne({ email });

    for (const key in additionalDetails) {
        user[key] = additionalDetails[key];
    }
    const updatedUser = await user.save();
    return updatedUser;
}
}

module.exports = UserService;