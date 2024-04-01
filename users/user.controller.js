const UserService = require('./user.service');
const userService = new UserService();

class UserController {
    registerUser(req, res) {
        const userDTO = req.body;
        const user = userService.register(userDTO);
        res.json(user);
    }

    // login using userDTO
    loginUser(req, res) {
        const userDTO = req.body;
        const user = userService.login(userDTO);

        if(!user) return res.status(404).send('User does not exist');
        res.json(user);
    }

    getAllUsers(req, res) {
        const users = userService.findAll();
        res.json(users);
    }

    getUserById(req, res) {
        const { id } = req.params;
        const user = userService.findOne(id);

        if(!user) return res.status(404).send('register not found');
        res.json(user);
    }

    updateUser(req, res) {
        const { id } = req.params;
        const { email, password } = req.body;
        const updatedUser = userService.update(id, email, password);
        if(!updatedUser) return res.status(404).send('User not found');
        res.status(200).json(updatedUser);
    }

    deleteUser(req, res) {
        const { id } = req.params;
        const result = userService.remove(id);
        if(!result) return res.status(404).send('User not found');
        res.status(204).send();
    }
}

module.exports = UserController;