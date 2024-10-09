const prisma = require("../prisma/client");


class ReservationRepository {

    async create(bookId, userId) {
        const obj = await prisma.reservation.create({
            data: {
                bookId,
                userId
            }
        });
        return obj;
    }

    async delete(bookId, userId) {
        try {
            await prisma.reservation.delete({
                where: {
                    bookId,
                    userId
                }
            });
            return true;
        } catch(error) {
            return false;
        }
    }

    async get(bookId, userId) {
        const obj = await prisma.reservation.findFirst({
            where: {
                bookId,
                userId
            }
        });
        if (!obj) {
            return false;
        }

        return obj;
    }
}


module.exports = ReservationRepository;