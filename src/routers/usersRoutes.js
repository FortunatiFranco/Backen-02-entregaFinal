import { Router, json, urlencoded} from "express";
import { userModel } from "../models/users-model.js";
import passport from "passport";

const router = Router();

router.get("/get-all", async (req, res) => {
    const getUsers = await userModel.find({});
    res.json(getUsers);
});

router.post("/", passport.authenticate("register", { failureRedirect: "/error-register", successRedirect: "/login", session: false }))

router.put("/", async (req, res) => {
    const { _id } = req.params;
    const update = req.body;
    const updateUser = await userModel.updateOne({ _id }, update);
    res.json(updateUser);
})

router.delete("/", async (req, res) => {
    const { email } = req.body;
    const deleteUser = await userModel.deleteOne({ email });
    res.json(deleteUser);
})

export default router;