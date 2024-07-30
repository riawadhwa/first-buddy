const userModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class UserService {
    static async registerUser(name, email, num, password, department) {
        try {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error("User with the same email already exists!");
            }

            const hashedPassword = await bcrypt.hash(password, 8);

            let user = new userModel({
                email,
                password: hashedPassword,
                num,
                name,
                department
            });
            user = await user.save();

            return user;
        } catch (e) {
            throw e;
        }
    }

    static async checkUser(email) {
        try {
            return await userModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData) {
        const secretKey = process.env.JWT_SECRET; // Retrieve the secret key from environment variables
        const jwt_expire = "1h"; // Set the expiration time or retrieve it from your config if needed
        return jwt.sign(tokenData, secretKey, { expiresIn: jwt_expire });
    }

    static async updateUser(email, additionalDetails) {
        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                throw new Error("User not found");
            }

            for (const key in additionalDetails) {
                user[key] = additionalDetails[key];
            }

            const updatedUser = await user.save();
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }
    static async getAllUsers() {
        try {
            const users = await userModel.find({}, "email name _id department num");
            return users;
        } catch (error) {
            throw new Error("Error fetching users: " + error.message);
        }
    }
}

module.exports = UserService;
