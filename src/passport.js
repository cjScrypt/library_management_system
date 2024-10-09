const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const { JWT_SECRET } = require("./config");
const { UserRepository } = require("./database/repository");
const { AuthenticationError } = require("./utils/appErrors");


const configPassport = () => {
    const userRepo = new UserRepository();
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
        algorithms: ["HS256"],
    }
    const strategy = new Strategy(options, async (payload, done) => {
        const user = await userRepo.getUser({ id: payload.id });
        if (user) {
            done(null, user);
        } else {
            const errorMessage = "Access denied due to invalid or missing credentials";
            const error = new AuthenticationError({ message: errorMessage });

            done(error, false);
        }
    });

    passport.use(strategy);
}


module.exports = {
    configPassport
}
