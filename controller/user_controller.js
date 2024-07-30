const UserService = require("../services/user_services");

function extractValidationErrors(error) {
    const validationErrors = {};
    for (const field in error.errors) {
        if (error.errors[field].kind === "user defined") {
            validationErrors[field] = error.errors[field].message;
        }
    }
    return validationErrors;
}

exports.register = async (req, res, next) => {
    try {
        const { name, email, num, password } = req.body;
        const successRes = await UserService.registerUser(
            name,
            email,
            num,
            password,
        );

        res.json({ status: true, success: `${email} User Registered Success` });
    } catch (error) {
        if (error.name === "ValidationError") {
            // If it's a Mongoose validation error, extract error messages.
            const validationErrors = extractValidationErrors(error);
            res.status(400).json({ errors: validationErrors });
        } else {
            // For other errors, send a general error response.
            res.status(500).json({ error: error.message });
        }
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.checkUser(email);

        if (!user) {
            return res
                .status(404)
                .json({ status: false, message: "User does not exist" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res
                .status(400)
                .json({ status: false, message: "Invalid password" });
        }

        const tokenData = { _id: user._id, email: user.email };
        const token = await UserService.generateToken(
            tokenData,
            "secretKey",
            "1h",
        );

        res.status(200).json({ status: true, token: token });
    } catch (err) {
        res.status(500).json({ status: false, message: err.message });
    }
};

exports.updateDetails = async (req, res) => {
    try {
        user: req.user;
        // Extract email from request body
        const email = req.body.email;

        const additionalDetails = {
            // Add the present address details
            presentAddress: {
                line1: req.body.presentAddressLine1,
                street: req.body.presentAddressStreet,
                city: req.body.presentAddressCity,
                stateProvince: req.body.presentAddressStateProvince,
                country: req.body.presentAddressCountry,
                zipCode: req.body.presentAddressZipCode,
            },
            permanentAddress: {
                line1: req.body.permanentAddressLine1,
                street: req.body.permanentAddressStreet,
                city: req.body.permanentAddressCity,
                stateProvince: req.body.permanentAddressStateProvince,
                country: req.body.permanentAddressCountry,
                zipCode: req.body.permanentAddressZipCode
            },
            familyDetails: {
                name: req.body.familyName,
                relationship: req.body.familyRelationship,
                dob: req.body.familyDOB,
                gender: req.body.familyGender,
                phoneNumber: req.body.familyPhoneNumber,
                email: req.body.familyEmail,
                address: req.body.familyAddress,
                maritalStatus: req.body.familyMaritalStatus,
                employmentStatus: req.body.familyEmploymentStatus,
                dependantStatus: req.body.familyDependantStatus
            },
            bankDetails: {
                bankName: req.body.bankName,
                bankAccountNumber: req.body.bankAccountNumber,
                ifsc: req.body.ifsc
            }

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
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.feedback = async (req, res) => {
    try {
        const { email, feedback } = req.body;
        const user = await UserService.checkUser(email);
        if (!user) {
            throw new Error("User Dont Exist");
        }
        user.feedback = feedback;
        const updatedUser = await user.save();
        res.json({ status: true, success: `feedback saved` });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes

        res.status(500).json({
            status: false,
            error: "Internal Server Error",
        });
    }
};
