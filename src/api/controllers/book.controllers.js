const { BookService } = require("../../services");
const { formatResponse } = require("../../utils");

class BookController {
    constructor() {
        this.service = new BookService();
    }

    async GetBookByISBN(req, res, next) {
        try {
            const { isbn } = req.param;
            const book = await this.service.getBookByISBN(isbn);

            return formatResponse(res, 200, book);
        } catch(error) {
            next(error);
        }
    }

    async ListBooks(req, res, next) {
        try {
            const { offset, limit } = req.query;
            const responseData = this.service.listBooks({ offset, limit });

            return formatResponse(res, 200, responseData);
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

    async ReturnBook(req, res, next) {
        try {
            const { isbn } = req.body;
            const { userId } = req.user.id;

            await this.service.recordReturn(isbn, userId);

            const responseData = { message: "Successful returned book." }

            return formatResponse(res, 200, )
        } catch(error) {
            next(error);
        }
    }
}


module.exports = BookController;