const db = require('../config/db');
const mongoose =require('mongoose');
const UserModel = require("./user_model");
const {Schema} = mongoose;


const fileSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    pdfData10th: {
        type: Buffer, // Assuming you want to store 10th result PDF data as Buffer
    },
    pdfData12th: {
        type: Buffer, // Assuming you want to store 12th result PDF data as Buffer
    },
    resumeData: {
        type: Buffer, // Assuming you want to store resume PDF data as Buffer
    },
});

const File = db.model('File', fileSchema);

module.exports = File;

