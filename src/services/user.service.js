const { UserRepository } = require("../database/repository");
const {
    generateJwtSignature, hashPassword,
    verifyPassword
} = require("../utils");

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

    async login(username, password) {
        const user = await this.repository.findUser({ username });
        if (!user) {
            throw new ServiceError("Invalid username or password.");
        }
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            throw new ServiceError("Invalid username or password.");
        }
        const token = generateJwtSignature({ id: user.id });

        return { token }
    }
}

module.exports = UserService;