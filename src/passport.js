const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const { JWT_SECRET } = require("./config");
const { UserRepository } = require("./database/repository");


const configPassport = () => {
    const userRepo = new UserRepository();
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
        algorithms: ["HS256"],
    }
    const strategy = new Strategy(options, async (payload, done) => {
        const user = await userRepo.findUser({ id: payload.id });
        if (user) {
            done(null, user);
        } else {
            // TODO: throw error here
            // done(null, false);
        }
    });

    passport.use(strategy);
}


module.exports = {
    configPassport
}