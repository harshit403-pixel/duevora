// importing modules 
import nodemailer from "nodemailer";
import env from "./env.config.js";

// creating a transporter for sending emails
const transporter = nodemailer.createTransport({

    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {

        user: env.SMTP_USER,
        pass: env.SMTP_PASS

    }

});

export default transporter;
