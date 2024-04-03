const UserService = require('./user.service');
const userService = new UserService();

class UserController {
    registerUser(req, res) {
        const userDTO = req.body;
        const register = userService.register(userDTO);
        res.status(201).json(register);
    }

    loginUser(req, res) {
        const userDTO = req.body;
        const login = userService.login(userDTO);
        if (!login) return res.status(404).send('Email or password invalid');
        res.status(200).json(login);
    }

    updateUser(req, res) {
        const { id } = req.params;
        const userDTO = req.body;
        const update = userService.update(id, userDTO);
        if (!update) return res.status(404).send('User not found');
        res.status(204).send(update);
    }

    getAllUsers(req, res) {
        const users = userService.findAll();
        res.json(users);
    }

    getUserById(req, res) {
        const { id } = req.params;
        const user = userService.findOne(id);
        if (!user) return res.status(404).send('register not found');
        res.json(user);
    }

    deleteUser(req, res) {
        const { id } = req.params;
        const result = userService.remove(id);
        if (!result) return res.status(404).send('User not found');
        res.status(204).send();
    }
}

module.exports = UserController;