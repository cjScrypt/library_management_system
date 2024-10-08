const { Router } = require("express");
const { BookController } = require("../controllers");
const { isAdmin, isAuthenticated } = require("../middlewares");
const { body } = require("express-validator");


module.exports = (() => {
    const router = Router();
    const controller = new BookController();

    router.use(isAuthenticated);

    router.post(
        "/",
        isAdmin,
        body(["title", "author", "isbn"]).notEmpty().withMessage("Field missing").escape(),
        body(["copiesAvailable", "pages"]).isInt().withMessage("Field must be an integer").toInt(),
        controller.AddBook.bind(controller)
    );

    router.delete(
        "/:bookId",
        isAdmin,
        controller.DeleteBook.bind(controller)
    );

    router.put(
        "/:bookId",
        isAdmin,
        controller.UpdateBook.bind(controller)
    );

    router.get(
        "/",
        controller.ListBooks.bind(controller)
    );

    router.get(
        "/:bookId",
        controller.GetBookById.bind(controller)
    );

    router.post(
        "/borrow",
        controller.BorrowBook.bind(controller)
    );

    router.post(
        "/return",
        controller.ReturnBook.bind(controller)
    );

    router.post(
        "/reserve",
        controller.ReserveBook.bind(controller)
    );

    router.delete(
        "/reserve",
        controller.DeleteBookReservation.bind(controller)
    );

    router.get(
        "/history",
        controller.UserBorrowHistory.bind(controller)
    );

    return router;
})();