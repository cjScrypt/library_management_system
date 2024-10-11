const { UserService } = require("../services")

const userService = new UserService();

const createSuperUser = async ({ username, password }) => {
    await userService.createSuperUser({ username, password });
}

const authenticateSuperUser = async ({ username, password }) => {
    
}


module.exports = {

}