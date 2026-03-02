import { Router } from "express";
import { userModel } from "../models/users-model.js";
import { generateToken, verifyPassword } from "../util.js";
import passport from "passport";

const router = Router();

router.get("/current", async (req, res) => {
    res.send(req.user || req.session.user);
});


router.post("/login", passport.authenticate("login", { failureRedirect: "/login-failed", successRedirect: "/profile" }));

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email }).lean()
        if (!user) return res.status(401).send("Usuario inexistente");
        if (verifyPassword(password, user.password)) {
            const token = generateToken(user)
            res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 }).redirect("/profile");
        } else {
            res.status(401).send("Credenciales incorrectas");
        }
    } catch (error) {
        res.status(500).send("Error en el servidor");
    }
})

router.post("/logout", async (req, res) => {
    req.user = null;
    res.clearCookie("jwt").send("Sesion finalizada con exito !!");
})

export default router;