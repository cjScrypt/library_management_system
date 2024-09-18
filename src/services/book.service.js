const { BookRepository, UserRepository } = require("../database/repository");
const { ServiceError } = require("../utils/appErrors");


class BookService {
    constructor() {
        this.repository = new BookRepository();
        this.userRepo = new UserRepository();
    }

    async listBooks({ offset, limit }) {
        const books = await this.repository.getBooks({ filter: {}, offset, limit });

        return books;
    }

    async getBookByISBN(isbn) {
        let book = await this.repository.getBooks({ filter: { isbn } });
        if (!book) {
            throw new ServiceError("Book not found.");
        }

        return book;
    }

    async recordBorrow(isbn, userId) {
        const book = await this.getBookByISBN(isbn);
        if (book.copiesAvailable == 0) {
            throw new ServiceError("No copies of this book is available at this time.");
        }
        await this.repository.reduceAvailableCopies(book.id, 1);

        const record = await this.userRepo.addRecord(userId, book.id);

        return record;
    }
}


module.exports = BookService;