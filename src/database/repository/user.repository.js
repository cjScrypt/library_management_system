const prisma = require("../prisma/client");


class UserRepository {
    constructor() {}

    async addRecord(userId, bookId) {
        const recordData = { 
            status: "NOT_RETURNED",
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
            include: { records: true }
        });

        const records = result.records;

        return records[records.length - 1];
    }

    async createUser({ username, password, isAdmin=false }) {
        const data = { username, password, isAdmin }
        const user = await prisma.user.create({ data });

        return user;
    }

    async getUser(filter={}) {
        const user = await prisma.user.findFirst({
            where: filter,
        });
        if (!user) {
            return false;
        }

        return user;
    }

    async getUsers(filter={}, offset=0, limit=20) {
        const users = await prisma.user.findMany({
            where: filter,
            skip: offset,
            take: limit
        });

        return users;
    }

    async update(userId, updateData) {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: updateData
            });
            return true;
        } catch(error) {
            return false;
        }
    }

    async deleteUser(filter) {
        try {
            await prisma.user.delete({
                where: filter
            });
            return true;
        } catch(error) {
            return false;
        }
    }
}


module.exports = UserRepository;