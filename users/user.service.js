const { v4: uuidv4 } = require("uuid");
const User = require("./user.entity.js");
const UserDTO = require("./user.dto.js");

const users = [
    {
        id: uuidv4(),
        email: "teste@teste.com",
        password: "123456",
    },
    {
        id: uuidv4(),
        email: "teste@2teste.com",
        password: "123456",
    },
];

class UserService {
    register(userDTO) {
        userDTO.id = uuidv4();
        const newUser = new User(userDTO);
        users.push(newUser);
        return newUser;
    }

    login(userDTO) {
        const user = users.find(
            (user) => user.email === userDTO.email && user.password === userDTO.password
        );
        if (!user) return null;
    }

    update(token, userDTO) {
        const decoded = jwt.verify(token, secretKey);
        const userIndex = users.findIndex(decoded.userId);
        if (userIndex === -1) return null;
        users[userIndex] = new User(userDTO);
        return users[userIndex];
    }

    remove(id) {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) return false;
        users.splice(userIndex, 1);
        return true;
    }

    findAll() {
        return users.map((user) => new UserDTO(user));
    }

    findOne(id) {
        return users.find((user) => user.id === id);
    }
}

module.exports = UserService;