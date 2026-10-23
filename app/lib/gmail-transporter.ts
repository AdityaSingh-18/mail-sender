import "server-only";
import nodemailer from "nodemailer";

export function createGmailTransport(
  senderEmail: string,
  appPassword: string,
) {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: senderEmail,
      pass: appPassword.replace(/\s+/g, ""),
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}