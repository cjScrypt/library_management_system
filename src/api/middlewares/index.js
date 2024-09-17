const passport = require("passport");


const isAuthenticated = (req, res, next) => {
    passport.authenticate("jwt", { session: false })(req, res, next);
}


module.exports = {
    isAuthenticated,
}