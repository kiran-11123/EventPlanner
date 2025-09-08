import nodemailer from "nodemailer";
const MAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "eventnest.offical.main@gmail.com",        // your Gmail address
    pass: MAIL_APP_PASSWORD,        // 16-char App Password from Google
  },
   tls: {
    rejectUnauthorized: false,        // 👈 ignore self-signed certificate issue
  },
});


export default transporter;