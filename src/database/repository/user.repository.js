const { PrismaClient } = require("@prisma/client");
const prisma = require("../prisma/client");


class UserRepository {
    constructor() {}

    async addRecord(userId, bookId) {
        const recordData = { 
            status: "BORROWED",
            dateBorrowed: new Date(),
            bookId,
        }

        const result = await prisma.user.update({
            where: { id: userId },
            data: {
                records: {
                    create: [ recordData ]
                },
            },
            include: { posts: true }
        });

        const records = result.records;

        return records[records.length - 1];
    }

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

    async update(id, data) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: id },
                data: data
            });
            return true;
        } catch(error) {
            return false;
        }
    }
}


module.exports = UserRepository;