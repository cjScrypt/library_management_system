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
    )
})