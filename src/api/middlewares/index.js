const passport = require("passport");

const { AuthenticationError, AccessForbiddenError } = require("../../utils/appErrors");


const isAuthenticated = (req, res, next) => {
    passport.authenticate("jwt", { session: false })(req, res, next);
}

const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            throw new AuthenticationError("Access denied due to invalid or missing credentials");
        }

        if (req.user.isAdmin) {
            throw new AccessForbiddenError("Access Denied! Not an Admin.");
        }
    } catch(error) {
        next(error);
    }
}


module.exports = {
    isAdmin,
    isAuthenticated,
}