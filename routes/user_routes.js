const route =require('express').Router();
const UserController = require('../controller/user_controller');
const multer = require('multer');
const File = require('../models/file_model');
const UserService = require('../services/user_services')

route.post("/registration",UserController.register);
route.post("/login",UserController.login);

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/upload", upload.fields([
    { name: '10thResult', maxCount: 1 },
    { name: '12thResult', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
]), async (req, res) => {
    try {
        const newFile = new File({
            title: req.body.title,
            description: req.body.description,
            pdfData10th: req.files['10thResult'][0].buffer,
            pdfData12th: req.files['12thResult'][0].buffer,
            resumeData: req.files['resume'][0].buffer,
        });

        const savedFile = await newFile.save();
        res.json(savedFile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


route.post('/update-details', async (req, res) => {
    try {
        // Extract user ID from request body or headers
        const email = req.body.email; // You may need to send the userId in the request body

        // Extract additional details from the request body
        const additionalDetails = {
            address: req.body.address,
            dob: req.body.dob,
            position: req.body.position,
            
            // Add more fields as needed
        };

        // Update the user with additional details
        const updatedUser = await UserService.updateUser(email, additionalDetails);

        // Send the updated user as a response
        res.json(updatedUser);
    } catch (error) {
        // Handle errors, e.g., if the user is not found or there's a server error
        res.status(500).json({ error: error.message });
    }
});

route.post("/feedback-form",UserController.feedback);

module.exports = route;