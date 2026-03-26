import { config } from "dotenv";
config();

export const env = {
    MONGO_URL: process.env.MONGO_URL,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    PORT: process.env.PORT,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    MAILING_ACCOUNT: process.env.MAILING_ACCOUNT,
    MAILING_PASS: process.env.MAILING_PASS,
    MAILING_PORT: process.env.MAILING_PORT,
    MAILING_SERVICE: process.env.MAILING_SERVICE
}