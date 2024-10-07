const { UserRepository } = require("../database/repository");
const {
    excludeFields, generateJwtSignature, hashPassword,
    verifyPassword
} = require("../utils");

const { BadRequest } = require("../utils/appErrors");

class UserService {
    constructor() {
        this.repository = new UserRepository();
    }

    async signUp(username, password) {
        const existingUser = await this.repository.getUser({ username });
        if (existingUser) {
            throw new BadRequest({ message: "User with this username exists" });
        }
        const hashedPassword = await hashPassword(password);
        await this.repository.createUser({
            username,
            password: hashedPassword
        });
    }

    async login({ username, password }) {
        const user = await this.repository.getUser({ username });
        if (!user) {
            throw new BadRequest({ message: "Invalid username or password." });
        }
        const isValidPassword = await verifyPassword(password, user.password);
        if (!isValidPassword) {
            throw new BadRequest({ message: "Invalid username or password." });
        }
        const token = generateJwtSignature({ id: user.id });

        return { token }
    }

    async getAllUsers({ offset, limit }) {
        const users = await this.repository.getUsers({}, offset, limit);

        return users;
    }

    async getProfile(userId) {
        const user = await this.repository.getUser({ id: userId });
        if (!user) {
            throw new BadRequest({ message: "User not found" });
        }
        const userWithoutPassword = excludeFields(user, ["password"]);
        return user;
    }

    async updateProfile(userId, updateData) {
        delete updateData['password'];

        const success = await this.repository.update(userId, updateData);
        if (!success) {
            throw new BadRequest({ message: "Profile update not successful. Try again" });
        }
    }
}

module.exports = UserService;