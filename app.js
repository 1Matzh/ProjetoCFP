const express = require("express");
const bodyParser = require("body-parser");
const UserController = require("./users/user.controller");

const app = express();
const port = 3000;

app.use(bodyParser.json());

const userController = new UserController();

// [Login] Rotas para funcionalidade do CRUD de Usuários
app.post("/users/register", (req, res) => userController.registerUser(req, res));
app.post("/users/login", (req, res) => userController.loginUser(req, res));
app.get("/users", (req, res) => userController.getAllUsers(req, res));



// app.get("/users/:id", (req, res) => userController.getUserById(req, res));
// app.put("/users/:id", (req, res) => userController.updateUser(req, res));
// app.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
