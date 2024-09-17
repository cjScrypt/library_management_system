const { UserService } = require("../../services");
const { formatResponse } = require("../../utils");

class UserController {
    constructor() {
        this.service = new UserService();
    }

    async ProfileDetails(req, res, next) {
        try {
            const userId = req.user.id;
            const responseData = await this.service.getProfile(userId);

            return formatResponse(res, 200, responseData);
        } catch(error) {
            next(error);
        }
    }
}

module.exports = UserController;