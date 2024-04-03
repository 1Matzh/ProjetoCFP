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
        const user = users.find((user) => user.email === userDTO.email && user.password === userDTO.password)
        if (!user) return null;
        return new UserDTO(user);
    }

    update(id, userDTO) {
        userDTO.id = id;
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) return null;
    
        const updatedUser = users[userIndex];
        for (const key in userDTO) {
            if (userDTO[key] !== undefined) {
                updatedUser[key] = userDTO[key];
            }
        }
        
        users[userIndex] = updatedUser;
        return updatedUser;
    }

    remove(id) {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) return null;
        return users.splice(userIndex, 1)[0];
    }

    findAll() {
        return users.map((user) => new UserDTO(user));
    }
}

module.exports = UserService;