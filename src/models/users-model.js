import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    email: {
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})



export const userModel = model("user", userSchema);