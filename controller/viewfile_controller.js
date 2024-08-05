// controllers/file_controller.js
const { listUserDocuments, getDocument } = require('../services/file_services');

// Controller to list user documents
const listUserDocumentsController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const documentsList = await listUserDocuments(userId);
    res.json(documentsList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Controller to retrieve a specific file
const getFilesController = async (req, res) => {
  try {
    const fileId = req.params.id;
    const docType = req.query.docType;
    const documentBuffer = await getDocument(fileId, docType);

    res.set({
      'Content-Type': 'application/pdf', // Adjust based on the file type
      'Content-Disposition': `inline; filename="${docType}.pdf"`, // Adjust the filename
    });
    res.send(documentBuffer);

  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = { listUserDocumentsController, getFilesController };
