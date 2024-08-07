// services/file_service.js
const File = require('../models/file_model');

// Function to list user documents
const listUserDocuments = async (userId) => {
  const fileDocs = await File.find({ user: userId });
  if (!fileDocs || fileDocs.length === 0) {
    throw new Error("No documents found for this user");
  }

  return fileDocs.map(doc => ({
    id: doc._id,
    title: doc.title,
    generalDocuments: Object.keys(doc.generalDocuments).filter(key => doc.generalDocuments[key] !== null),
    educationalDocuments: Object.keys(doc.educationalDocuments).filter(key => doc.educationalDocuments[key] !== null),
  }));
};

// Function to retrieve a specific document
const getDocument = async (userId , docType) => {
  const fileDoc = await File.findOne({ user: userId });
  
  if (!fileDoc || (!fileDoc.generalDocuments[docType] && !fileDoc.educationalDocuments[docType])) {
    throw new Error("Document not found");
  }

  const documentBuffer = fileDoc.generalDocuments[docType] || fileDoc.educationalDocuments[docType];
  return documentBuffer;
};

module.exports = { listUserDocuments, getDocument };
