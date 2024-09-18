const prisma = require("../prisma/client");


class BookRepository {
    async getBooks({ filter={}, offset=0, limit=20 }) {
        const books = await prisma.book.findMany({
            skip: offset,
            take: limit,
        });

        return books;
    }

    async reduceAvailableCopies(isbn, count) {
        await prisma.book.update({
            where: { isbn },
            data: {
                copiesAvailable: { decrement: count }
            }
        });
    }
}


module.exports = BookRepository;