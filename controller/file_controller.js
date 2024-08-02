const multer = require("multer");
const File = require("../models/file_model"); // Adjust the path to your File model

// Define memory etc.storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Multer middleware
const multerMiddleware = upload.fields([
  { name: "aadharCard", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "passport", maxCount: 1 },
  { name: "passportPhoto", maxCount: 1 },
  { name: "voterIdOrDrivingLicense", maxCount: 1 },
  { name: "10thMarksheet", maxCount: 1 },
  { name: "12thMarksheet", maxCount: 1 },
  { name: "ugDegreeMarksheet", maxCount: 1 },
  { name: "pgDegreeMarksheet", maxCount: 1 },
  { name: "certificates", maxCount: 1 },
]);

// Controller to handle file uploads
const uploadFiles = async (req, res) => {
  try {
    const newFile = new File({
      user: req.user, // Assuming you have a user model and user ID is stored in the requzxest
      title: req.body.title,
      description: req.body.description,
      generalDocuments: {
        aadharCard: req.files["aadharCard"]
          ? req.files["aadharCard"][0].buffer
          : null,
        panCard: req.files["panCard"] ? req.files["panCard"][0].buffer : null,
        passport: req.files["passport"]
          ? req.files["passport"][0].buffer
          : null,
        passportPhoto: req.files["passportPhoto"]
          ? req.files["passportPhoto"][0].buffer
          : null,
        voterIdOrDrivingLicense: req.files["voterIdOrDrivingLicense"]
          ? req.files["voterIdOrDrivingLicense"][0].buffer
          : null,
      },
      educationalDocuments: {
        tenthMarksheet: req.files["10thMarksheet"]
          ? req.files["10thMarksheet"][0].buffer
          : null,
        twelfthMarksheet: req.files["12thMarksheet"]
          ? req.files["12thMarksheet"][0].buffer
          : null,
        ugDegreeMarksheet: req.files["ugDegreeMarksheet"]
          ? req.files["ugDegreeMarksheet"][0].buffer
          : null,
        pgDegreeMarksheet: req.files["pgDegreeMarksheet"]
          ? req.files["pgDegreeMarksheet"][0].buffer
          : null,
        certificates: req.files["certificates"]
          ? req.files["certificates"][0].buffer
          : null,
      },
    });

    const savedFile = await newFile.save();
    res.json(savedFile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadFiles,
  multerMiddleware,
};
