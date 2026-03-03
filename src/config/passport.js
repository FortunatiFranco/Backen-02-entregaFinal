import passport from "passport"
import { Strategy as localStrategy } from "passport-local";
import { userModel } from "../models/users-model.js";
import { cookieExtractor, hashPassword, verifyPassword } from "../util.js";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";


function initializePassport() {
    passport.use("register", new localStrategy({
        passReqToCallback: true,
        usernameField: "email",
        passwordField: "password",
    },
        async (req, email, password, done) => {
            try {
                const user = req.body;
                const userExist = await userModel.findOne({ email });
                if (userExist) {
                    console.log("Usuario ya existente");
                    return done(null, false);
                }
                const hashedPassword = hashPassword(password);
                const newUser = await userModel.create({ ...user, password: hashedPassword })
                return done(null, newUser);
            } catch (error) {
                console.error(error);
            }
        }));
    passport.use("login", new localStrategy({
        usernameField: "email",
        passwordField: "password",
        session: true
    },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({ email }).lean();
                if (!user) {
                    return done(null, false);
                }
                if (verifyPassword(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error.message);
            }
        }
    ));
    passport.use("jwt", new jwtStrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
        secretOrKey: "tokensecreto"
    },
        async (payload, done) => {
            try {
                return done(null, payload)
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.serializeUser((user, done) => {
        return done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id).lean();
        return done(null, user);
    });
}

export default initializePassport;