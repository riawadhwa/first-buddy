const db = require("../config/db");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const fileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming your user model is named 'User'
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    generalDocuments: {
        aadharCard: Buffer,
        panCard: Buffer,
        passport: Buffer,
        passportPhoto: Buffer,
        voterIdOrDrivingLicense: Buffer,
    },
    educationalDocuments: {
        tenthMarksheet: Buffer,
        twelfthMarksheet: Buffer,
        ugDegreeMarksheet: Buffer,
        pgDegreeMarksheet: Buffer,
        certificates: Buffer,
    },
});

const File = db.model("File", fileSchema);

module.exports = File;
