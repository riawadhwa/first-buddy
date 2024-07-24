const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

const dbURI = process.env.MONGODB_URI;

mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error:", err));

module.exports = mongoose;
