import { Router } from "express";
import { customPassportCall } from "../util.js";
import { errorRegister, login, profile, register } from "../controllers/viewsControllers.js";


const router = Router();

router.get("/login", login)

router.get("/register", register)

router.get("error-register", errorRegister)

router.use(customPassportCall("jwt"));

router.get("/profile", profile)


export default router;