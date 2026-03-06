import nodemailer from "nodemailer";
import {logger} from "./logger.js";
import dotenv from 'dotenv'
dotenv.config();
const transporter = nodemailer.createTransport({
secure:true,
host:'smtp.gmail.com',
port:465,
  auth: {
    user: process.env.EMAIL_USERID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

transporter.verify()
  .then(() => {
    logger.info("SMTP transporter ready");
  })
  .catch((err) => {
    logger.error("SMTP transporter failed", {
      message: err.message,
      stack: err.stack,
    });
  });

export default transporter;
