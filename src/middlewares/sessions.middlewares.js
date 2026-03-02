import { validateToken } from "../util.js";


export async function validateJwtSessions(req, res, next) {
    if (req.cookies.jwt) {
        const user = validateToken(req.cookies.jwt, "tokensecreto");
        req.user = user;
        next()
    } else {
        res.redirect("/login");
    }
}