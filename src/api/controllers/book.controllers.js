const { BookService } = require("../../services");
const { formatResponse } = require("../../utils");
const { getRequestData } = require("../validators");

class BookController {
    constructor() {
        this.service = new BookService();
    }

    async AddBook(req, res, next) {
        try {
            const { title, author, isbn, copiesAvailable, pages } = getRequestData(req)["body"];
            const book = await this.service.addBook({ title, author, isbn, copiesAvailable, pages });

            return formatResponse(res, 200, book);
        } catch(error) {
            next(error);
        }
    }

    async BorrowBook(req, res, next) {
        try {
            const userId = req.user.id;
            const { isbn } = req.body;

            const record = await this.service.recordBorrow(isbn, userId);

            return formatResponse(res, 200, record);
        } catch(error) {
            next(error);
        }
    }

    async DeleteBook(req, res, next) {
        try {
            const { bookId } = req.params;
            await this.service.deleteBook(bookId);

            const responseData = { message: "Delete operation successful" }

            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }

    async DeleteBookReservation(req, res, next) {
        try {
            const { isbn } = req.body;
            const userId = req.user.id;

            await this.service.deleteBookReservation(isbn, userId);

            const responseData = { message: "Book reservation successfully deleted." }
            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }

    async GetBookById(req, res, next) {
        try {
            const { bookId } = req.params;
            console.log(`BookId ${bookId}`);
            const book = await this.service.getBookById(bookId);

            return formatResponse(res, 200, book);
        } catch(error) {
            next(error);
        }
    }

    async ListBooks(req, res, next) {
        try {
            const { offset, limit } = req.query;
            const responseData = await this.service.listBooks({ offset, limit });

            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }

    async ReserveBook(req, res, next) {
        try {
            const { isbn } = req.body;
            const userId = req.user.id;

            await this.service.makeReservation(isbn, userId);

            const responseData = { message: "Book successfully reserved. You will get a notification when one is available." }
            return formatResponse(res, 200, responseData );
        } catch(error) {
            next(error);
        }
    }

    async ReturnBook(req, res, next) {
        try {
            const { isbn } = req.body;
            const { userId } = req.user.id;

            await this.service.recordReturn(isbn, userId);

            const responseData = { message: "Successful returned book." }
            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }

    async UpdateBook(req, res, next) {
        try {
            const { bookId } = req.params;
            const { title, author, copiesAvailable, pages } = req.body;
            await this.service.updateBook(
                bookId,
                { title, author, copiesAvailable, pages }
            );

            return formatResponse(res, 200, { message: "Update operation successful" });
        } catch(error) {
            next(error);
        }
    }

    async UserBorrowHistory(req, res, next) {
        try {
            const userId = req.user.id;
            const records = await this.service.getUserBorrowingRecords(userId);

            return formatResponse(res, 200, records);
        } catch(error) {
            next(error);
        }
    }
}


module.exports = BookController;