// Importing modules
import transporter from "../config/mail.config.js";

// function to send the mails
function sendMail(to, subject, html) {

    // using transporter to send the mails 
    transporter.sendMail({
        from: process.env.SENDING_USER,
        to,
        subject,
        html
    });

}

export default sendMail;
