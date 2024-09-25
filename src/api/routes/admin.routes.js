const { Router } = require("express");

const { AdminController } = require("../controllers");
const { isAdmin, isAuthenticated } = require("../middlewares");

module.exports = (() => {
    const router = Router();
    const controller = new AdminController();

    router.use(isAuthenticated, isAdmin);

    /**
     *
     */
    router.post(
        "/books",
        controller.AddBook.bind(controller)
    );

    /**
     *
     */
    router.get(
        "/users",
        controller.ListUsers.bind(controller)
    );

    /**
     *
     */
    router.put(
        "/users/:userId",
        controller.UpdateUser.bind(controller)
    );

    /**
     *
     */
    router.put(
        "/books/:isbn",
        controller.UpdateBook.bind(controller)
    );

    /**
     *
     */
    router.delete(
        "/books/:isbn",
        controller.DeleteBook.bind(controller)
    );

    return router;
})();