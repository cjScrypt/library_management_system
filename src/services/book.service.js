const { BookRepository, RecordRepository, UserRepository } = require("../database/repository");
const { ServiceError } = require("../utils/appErrors");


class BookService {
    constructor() {
        this.repository = new BookRepository();
        this.recordRepo = new RecordRepository();

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

    async recordReturn(isbn, userId) {
        const record = await this.recordRepo.getBorrowedBookRecord({ bookId: isbn, userId });
        const updateData = {
            status: "RETURN",
            dateReturned: new Date()
        }

        const updatedRecord = await this.recordRepo.update(record.id, updateData);

        return updatedRecord;
    }
}


module.exports = BookService;