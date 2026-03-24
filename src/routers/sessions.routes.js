import { Router } from "express";
import passport from "passport";
import { controllerLogin, controllerLogout, current } from "../controllers/sessionsControllers.js";

const router = Router();

router.get("/current", passport.authenticate("jwt"), current);


router.post("/login", passport.authenticate("login"), controllerLogin);


router.post("/logout", controllerLogout)

export default router;