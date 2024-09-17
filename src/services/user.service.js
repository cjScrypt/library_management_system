const { UserRepository } = require("../database/repository");
const { hashPassword } = require("../utils");

const { ServiceError } = require("../utils/appErrors");

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async signUp(username, password) {
        const existingUser = await this.repository.findUser({ username });
        if (existingUser) {
            throw new ServiceError("User with this username exists");
        }
        const hashedPassword = await hashPassword(password);
        await this.repository.createUser({
            username,
            password: hashedPassword
        });
    }
}

module.exports = UserService;