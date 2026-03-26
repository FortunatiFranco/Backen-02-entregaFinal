import { transporter } from "../config/mailing.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const generateResetToken = (user) => {
    return jwt.sign(
        { email: user.email },
        env.TOKEN_SECRET,
        { expiresIn: "1h" }
    );
};


const sendRecoveryEmail = async (user, token) => {
    const link = `http://localhost:${env.PORT}/reset-password?token=${token}`;

    await transporter.sendMail({
        from: env.MAILING_ACCOUNT,
        to: user.email,
        subject: "Recuperación de contraseña",
        html: `
            <h2>Recuperar contraseña</h2>
            <p>Hacé click en el botón:</p>
            <a href="${link}">
                <button>Restablecer contraseña</button>
            </a>
            <p>Este enlace expira en 1 hora</p>
        `
    });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await userDAO.getByEmail(email);
    if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const token = generateResetToken(user);
    await sendRecoveryEmail(user, token);
    res.json({ message: "Email enviado" });
};