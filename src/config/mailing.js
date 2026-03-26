import nodemailer from "nodemailer";
import { env } from "./env.js"

export const transporter = nodemailer.createTransport({
    service: env.MAILING_SERVICE,
    port: env.MAILING_PORT,
    auth: {
        user: env.MAILING_ACCOUNT,
        pass: env.MAILING_PASS
    }
})