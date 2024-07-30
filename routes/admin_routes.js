const route = require("express").Router();
const UserController = require("../controller/user_controller");

route.post("/create-user", UserController.register);

route.get("/users", UserController.getAllUsers);

//route.get("/user", authenticate, (req, res) => {
//  req.user is available here thanks to our middleware
//  res.json({ id: req.user });
//});

module.exports = route;
