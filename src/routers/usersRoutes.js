import { Router } from "express";
import passport from "passport";
import { deleteUser, getAll, updateUser } from "../controllers/usersControllers.js";

const router = Router();

router.get("/get-all", getAll);

router.post("/", passport.authenticate("register", { failureRedirect: "/error-register", successRedirect: "/login", session: false }))

router.put("/:email", updateUser);

router.delete("/", deleteUser);

export default router;