const route = require("express").Router();
const UserController = require("../controller/user_controller");
const FileController = require("../controller/file_controller");
const UserService = require("../services/user_services");
const authenticate = require('../middleware/authenticate');

route.post("/registration", UserController.register);
route.post("/login", UserController.login);

route.get("/user", authenticate, (req, res) => {
  // req.user is available here thanks to our middleware
  res.json({ id: req.user });
});



route.post(
    "/upload", authenticate,
    FileController.multerMiddleware,
    FileController.uploadFiles,
);

route.post("/update-details", async (req, res) => {
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
        const updatedUser = await UserService.updateUser(
            email,
            additionalDetails,
        );

        // Send the updated user as a response
        res.json(updatedUser);
    } catch (error) {
        // Handle errors, e.g., if the user is not found or there's a server error
        res.status(500).json({ error: error.message });
    }
});

route.post("/feedback-form", UserController.feedback);

module.exports = route;
