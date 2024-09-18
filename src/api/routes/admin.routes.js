const { Router } = require("express");

const { AdminController } = require("../controllers");
const { isAdmin, isAuthenticated } = require("../middlewares");

module.exports = (() => {
    const router = Router();
    const controller = new AdminController();

    router.use(isAuthenticated, isAdmin);

    return router;
})();