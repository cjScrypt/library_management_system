const prisma = require("../prisma/client");


class BookRepository {
    async createBook(fields) {
        const book = prisma.book.create({
            data: fields
        });

        return book;
    }

    async getBooks({ filter={}, offset=0, limit=20 }) {
        const books = await prisma.book.findMany({
            where: filter,
            skip: offset,
            take: limit,
        });

        return books;
    }

    async reduceAvailableCopies(bookId, count) {
        await prisma.book.update({
            where: { id: bookId },
            data: {
                copiesAvailable: { decrement: count }
            }
        });
    }

    async update(bookId, updateData) {
        try {
            await prisma.book.update({
                where: { id: bookId },
                data: updateData
            });
            return true;
        } catch(error) {
            return false;
        }
    }

    async delete(filter) {
        try {
            await prisma.book.delete({
                where: filter
            });
            return true;
        } catch(error) {
            return false;
        }
    }
}


module.exports = BookRepository;