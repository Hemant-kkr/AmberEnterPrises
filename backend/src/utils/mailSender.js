import transporter from "./transporter.js";
import {logger} from "./logger.js";
import AppError from "./appError.js";



export async function mailSender({ to, subject, text, html }) {
  try {
  
  const mailOptions = {
    from: `"Amber Safety Enterprises Dev Store" <${process.env.EMAIL_USERID}>`,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };
  const info = await transporter.sendMail(mailOptions);
  // logger.info("Mail sent", {
  //   to,
  //   subject,
  //   messageId: info.messageId,
  // });
  return info;
  } catch (err) {
    throw new AppError("Email sending failed", 500);
  }
}
