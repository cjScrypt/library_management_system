const { UserService } = require("../../services");
const { formatResponse } = require("../../utils");

class AuthController {

    constructor() {
        this.userService = new UserService();
    }

    async Signup(req, res, next) {
        try {
            const { username, password } = req.body;

            await this.userService.signUp(username, password);
            const resData = {
                message: "Registration successful"
            }
            return formatResponse(res, 200, resData);

        } catch (error) {
            next(error);
        }
    }

    async Login(req, res, next) {
        try {
            const { username, password } = req.body;
            const resData = await this.userService.login({ username, password });

            return formatResponse(res, 200, resData);
        } catch(error) {
            next(error);
        }
    }

    async Logout(req, res, next) {
        try {
            req.logout();

            const resData = {
                message: "User successfully logged out."
            }

            return formatResponse(res, 200, resData);
        } catch(error) {
            next(error);
        }
    }
}


module.exports = AuthController;