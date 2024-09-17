const { Router } = require("express");

const { UserController } = require("../controllers");
const { isAuthenticated } = require("../middlewares");

module.exports = (() => {
    const router = Router();
    const controller = new UserController();

    router.use(isAuthenticated);

    /**
     *
     */
    router.get(
        "/",
        controller.ProfileDetails.bind(controller)
    );

    /**
     * 
     */
    router.

    return router;
})();