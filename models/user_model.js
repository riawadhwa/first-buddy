const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const { Schema } = mongoose;

const addressSchema = new Schema(
    {
        line1: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        stateProvince: { type: String, required: true },
        country: { type: String, required: true },
        zipCode: { type: String, required: true },
    },
    { _id: false },
);

const familyDetailsSchema = new Schema(
    {
        name: { type: String, required: true },
        relationship: { type: String, required: true },
        dob: { type: String, required: true },
        gender: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        email: {
            type: String,
            required: true,
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
        address: { type: String, required: true },
        maritalStatus: { type: String, required: true },
        employmentStatus: { type: String, required: true },
        dependantStatus: { type: String, required: true },
    },
    { _id: false },
);

const bankDetailsSchema = new Schema(
    {
        bankName: { type: String, required: true },
        bankAccountNumber: { type: String, required: true },
        ifsc: { type: String, required: true },
    },
    { _id: false },
);

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    num: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10,
    },
    password: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        default: "",
    },
    feedback: {
        type: String,
        default: "",
    },
    presentAddress: addressSchema,
    permanentAddress: addressSchema,
    familyDetails: familyDetailsSchema,
    bankDetails: bankDetailsSchema,
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compare(userPassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const userModel = db.model("User", userSchema);

module.exports = userModel;
