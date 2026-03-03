import { Router } from "express";
import { userModel } from "../models/users-model.js";
import { generateToken, } from "../util.js";
import passport from "passport";

const router = Router();

router.get("/current", passport.authenticate("jwt"), async (req, res) => {
    res.send(req.user);
});


router.post("/login", passport.authenticate("login"), (req, res) => {
    const token = generateToken(req.user);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
    return res.redirect("/profile");
});


router.post("/logout", async (req, res) => {
    req.user = null;
    res.clearCookie("jwt").send("Sesion finalizada con exito !!");
})

export default router;