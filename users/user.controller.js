const UserService = require('./user.service');
const userService = new UserService();

class UserController {
    registerUser(req, res) {
        const userDTO = req.body;
        const register = userService.register(userDTO);
        if (!register) return res.status(404).send('Invalid email or password');
        res.status(201).json({
            message: "User created successfully!",
            service: register
        });
    }

    loginUser(req, res) {
        const userDTO = req.body;
        const login = userService.login(userDTO);
        if (!login) return res.status(404).send('Invalid email or password');
        res.status(200).json({
            message: "User logged successfully!",
            service: login
        });
    }

    updateUser(req, res) {
        const { id } = req.params;
        const userDTO = req.body;
        const update = userService.update(id, userDTO);
        if (!update) return res.status(404).send('User not found');
        res.status(200).json({
            message: "User updated successfully",
            service: update
        });
    }

    removeUser(req, res) {
        const { id } = req.params;
        const remove = userService.remove(id);
        if (!remove) return res.status(404).send('User not found');
        res.status(200).json({
            message: "User removed successfully",
            service: remove
        });
    }

    getAllUsers(req, res) {
        const users = userService.findAll();
        res.json(users);
    }
}

module.exports = UserController;