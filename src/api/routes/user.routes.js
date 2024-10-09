const { Router } = require("express");

const { UserController } = require("../controllers");
const { isAuthenticated, isAdmin } = require("../middlewares");

module.exports = (() => {
    const router = Router();
    const controller = new UserController();

    router.use(isAuthenticated);

    router.get(
        "/",
        isAdmin,
        controller.AdminListUsers.bind(controller)
    );

    router.put(
        "/me",
        controller.UpdateProfile.bind(controller)
    );

    router.put(
        "/:userId",
        isAdmin,
        controller.AdminUpdateUser.bind(controller)
    );

    router.get(
        "/me",
        controller.ProfileDetails.bind(controller)
    );

    return router;
})();