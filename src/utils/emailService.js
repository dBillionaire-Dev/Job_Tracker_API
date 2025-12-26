import nodemailer from 'nodemailer';
import env from "../config/env.js";

export const sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS,
        },
    });

    await transporter.sendMail({
        from: `"Job Tracker" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });
};
