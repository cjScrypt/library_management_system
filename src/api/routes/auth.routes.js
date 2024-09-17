const { Router } = require("express");

const { AuthController } = require("../controllers");

module.exports = (() => {
    const router = Router();
    const controller = new AuthController();

    /**
     *
     */
    router.post(
        "/signup",
        controller.Signup.bind(controller)
    );

    return router;
})();