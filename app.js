const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("./users/user.controller");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const userController = new UserController();

// Rotes for user CRUD functionality
app.post("/users/register", (req, res) => userController.registerUser(req, res));
app.post("/users/login", (req, res) => userController.loginUser(req, res));
app.put("/users/update/:id", (req, res) => userController.updateUser(req, res));

app.get("/users", (req, res) => userController.getAllUsers(req, res));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
