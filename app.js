const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user_routes");

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE", // Allow specific methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  }),
);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use your routes
app.use("/api", userRouter); // Adjust the base path as needed

module.exports = app;
