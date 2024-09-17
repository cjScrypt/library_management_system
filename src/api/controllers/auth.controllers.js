const { UserService } = require("../../services");

class AuthController {

    constructor() {
        this.userService = new UserService();
    }

    async Signup(req, res, next) {
        try {
            const { username, password } = req.body;

            await this.userService.signUp(username, password);

        } catch (error) {
            next(error);
        }
    }
}


module.exports = AuthController;