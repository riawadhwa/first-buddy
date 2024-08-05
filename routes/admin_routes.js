const route = require("express").Router();
const UserController = require("../controller/user_controller");
const { listUserDocumentsController, getFilesController } = require('../controller/viewfile_controller');

route.post("/create-user", UserController.register);

route.get("/users", UserController.getAllUsers);

// Route to list user documents
route.get('/files/user/:userId', listUserDocumentsController);

// Route to retrieve a specific file
route.get('/files/:id', getFilesController);


module.exports = route;
