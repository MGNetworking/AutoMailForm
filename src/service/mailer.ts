import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  host: "mail.ghoverblog.ovh", // Utilisez le nom de domaine
  secure: true, // false pour STARTTLS sur 587, true pour SSL direct sur 465
  port: 465,
  auth: {
    user: config.AUTH_USER,
    pass: config.AUTH_PASSWORD,
  },
});

/**
 *  Permet de former un message
 * @param name
 * @param email
 * @param message
 * @param subject
 * @param from_mail
 * @param to_mail
 * @returns
 */
export const sendMail = async (
  message: string,
  subject: string,
  from_mail: string,
  to_mail: string
) => {
  const mailOptions = {
    from: from_mail,
    to: to_mail,
    subject: subject,
    text: message,
  };

  return await transporter.sendMail(mailOptions);
};

/**
 * Permet d'envoyer un message simple
 * @param userEmail
 * @returns
 */
export const sendUserEmail = async (
  userEmail: string,
  subject: string,
  text: string,
  userReception: string
) => {
  const mailOptions = {
    from: config.FROM,
    to: userEmail,
    subject: subject,
    text: text,
    dsn: {
      id: "1234",
      return: "headers", // 'headers' ou 'full' pour obtenir un rapport complet
      notify: ["success", "failure", "delay"], // Notifications souhaitées
      recipient: userReception, // Adresse où la DSN sera envoyée
    },
  };

  return await transporter.sendMail(mailOptions);
};
