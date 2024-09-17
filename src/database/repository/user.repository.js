const { PrismaClient } = require("@prisma/client");
const prisma = require("../prisma/client");


class UserRepository {
    constructor() {}

    async createUser({ username, password }) {
        const data = { username, password }
        const user = await prisma.user.create({ data });

        return user;
    }

    async findUser(filter) {
        const user = prisma.user.findFirst({
            where: filter
        });
        if (!user) {
            return false;
        }

        return user;
    }
}


module.exports = UserRepository;