const { BookService, UserService } = require("../../services");
const { formatResponse } = require("../../utils");

class AdminController {
    constructor() {
        this.bookService = new BookService();
        this.userService = new UserService();
    }

    async AddBook(req, res, next) {
        try {
            const { title, author, isbn, copiesAvailable, pages } = req.body;
            const book = await this.bookService.addBook({ title, author, isbn, copiesAvailable, pages });

            return formatResponse(res, 200, book);
        } catch(error) {
            next(error);
        }
    }

    async ListUsers(req, res, next) {
        try {
            const { offset, limit } = req.query;
            const users = await this.userService.getAllUsers({ offset, limit });

            return formatResponse(res, 200, users);
        } catch(error) {
            next(error);
        }
    }

    async UpdateUser(req, res, next) {
        try {
            const { username } = req.body;
            const userId = req.params;

            await this.userService.updateProfile(userId, { username });
            const responseData = { message: "Update operation successful" }

            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }

    async UpdateBook(req, res, next) {
        try {
            const { isbn } = req.params;
            const { title, author, copiesAvailable, pages } = req.body;
            await this.bookService.updateBook(
                isbn,
                { title, author, copiesAvailable, pages }
            );

            return formatResponse(res, 200, { message: "Update operation successful" });
        } catch(error) {
            next(error);
        }
    }

    async DeleteBook(req, res, next) {
        try {
            const { isbn } = req.params;
            await this.bookService.deleteBook(isbn);

            const responseData = { message: "Delete operation successful" }

            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }
}


module.exports = AdminController;