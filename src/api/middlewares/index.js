const passport = require("passport");

const appErrorHandler = require("./error-handler");
const { AuthenticationError, AccessForbiddenError } = require("../../utils/appErrors");


const isAuthenticated = (req, res, next) => {
    passport.authenticate(
        "jwt",
        { session: false },
        /**
         * TODO: Figure out how to authenticate user without using express-session (without using req.login)
         * (err, user, info) => {
         *     if (err) { next(err); }
         *     if (!user) {
         *         throw new AuthenticationError({ message: "Access denied due to invalid or missing credentials"});
         *     } else {
         *         req.login(user, next);
         *     }
         *     next();
         * }
         */
    )(req, res, next);
}

const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            throw new AuthenticationError({ message: "Access denied due to invalid or missing credentials" });
        }

        if (!req.user.isAdmin) {
            throw new AccessForbiddenError({ message: "Access Denied! Not an Admin." });
        }
        next();
    } catch(error) {
        next(error);
    }
}


module.exports = {
    appErrorHandler,
    isAdmin,
    isAuthenticated,
}