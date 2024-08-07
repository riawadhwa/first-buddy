// controllers/file_controller.js
const { listUserDocuments, getDocument } = require("../services/file_services");
const User = require("../models/user_model");

// Controller to list user documents
const listUserDocumentsController = async (req, res) => {
  try {
    const userEmail = req.params.email;

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const documentsList = await listUserDocuments(user._id);
    res.json(documentsList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Controller to retrieve a specific file
const getFilesController = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const docType = req.query.docType;
    
    const user = await User.findOne({ email: userEmail });
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const documentBuffer = await getDocument(user._id , docType);

    res.set({
      "Content-Type": "application/pdf", // Adjust based on the file type
      "Content-Disposition": `inline; filename="${docType}.pdf"`, // Adjust the filename
    });
    res.send(documentBuffer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { listUserDocumentsController, getFilesController };
