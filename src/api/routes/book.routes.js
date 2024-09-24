const { Router } = require("express");
const { BookController } = require("../controllers");


module.exports = (() => {
    const router = Router();
    const controller = new BookController();

    /**
     *
     */
    router.get(
        "/",
        controller.ListBooks.bind(controller)
    );

    /**
     *
     */
    router.get(
        "/:isbn",
        controller.GetBookByISBN.bind(controller)
    );

    /**
     *
     */
    router.post(
        "/borrow",
        controller.BorrowBook.bind(controller)
    );

    /**
     * 
     */
    router.post(
        "/return",
        controller.ReturnBook.bind(controller)
    );

    /**
     *
     */
    router.post(
        "/reserve",
        controller.ReserveBook.bind(controller)
    );

    /**
     *
     */
    router.delete(
        "/reserve",
        controller.DeleteReservedBook(controller)
    );
})