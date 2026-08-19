import nodemailer from "nodemailer";

const envEmailUser = process.env.EMAIL_USER;
const envEmailAppPassword =
  process.env.EMAIL_APP_PASSWORD;

if (!envEmailUser || !envEmailAppPassword) {
  throw new Error(
    "EMAIL_USER or EMAIL_APP_PASSWORD is missing from .env.local",
  );
}

const emailUser: string = envEmailUser;
const emailAppPassword: string =
  envEmailAppPassword;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: emailUser,
    pass: emailAppPassword,
  },
});

export type EmailType =
  | "text"
  | "html"
  | "otp"
  | "booking"
  | "attachment"
  | "welcome"
  | "reset"
  | "notification";

type SendEmailParams = {
  to: string;
  subject: string;
  message: string;
  emailType: EmailType;
};

export async function sendEmail({
  to,
  subject,
  message,
  emailType,
}: SendEmailParams) {
  const isHtmlEmail = emailType === "html";

  const mailOptions: nodemailer.SendMailOptions = {
    from: {
      name: "MailSender",
      address: emailUser,
    },

    to,
    subject,

    ...(isHtmlEmail
      ? {
          html: message,
        }
      : {
          text: message,
        }),
  };

  const info = await transporter.sendMail(
    mailOptions,
  );

  const accepted = Array.isArray(info.accepted)
    ? info.accepted
    : [];

  if (accepted.length === 0) {
    throw new Error(
      "The email server did not accept the recipient.",
    );
  }
}