const route = require("express").Router();
const UserController = require("../controller/user_controller");
const FileController = require("../controller/file_controller");
const UserService = require("../services/user_services");
const authenticate = require('../middleware/authenticate');


route.post("/login", UserController.login);



route.post(
    "/upload", authenticate,
    FileController.multerMiddleware,
    FileController.uploadFiles,
);

route.post('/update-details', UserController.updateDetails);

route.post("/feedback-form", UserController.feedback);

module.exports = route;
