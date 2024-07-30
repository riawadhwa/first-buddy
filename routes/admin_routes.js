const route = require("express").Router();
const UserController = require("../controller/user_controller");


route.post("/create-user", UserController.register);

route.get("/users", UserController.getAllUsers);


module.exports = route;
