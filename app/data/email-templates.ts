import type { EmailTypeId } from "@/data/email-types";

type EmailTemplate = {
  subject: string;
  body: string;
};

export const emailTemplates: Record<EmailTypeId, EmailTemplate> = {
  text: {
    subject: "Hello from MailSender",
    body: `Hello!

This is a simple text email sent using our email delivery system.

Regards,
MailSender`,
  },

  html: {
    subject: "Explore Our Latest Update",
    body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
  <h1 style="color: #2563eb; margin-bottom: 16px;">
    Hello!
  </h1>

  <p style="font-size: 16px; color: #475569; line-height: 1.7;">
    We have something exciting to share with you.
  </p>

  <p style="font-size: 16px; color: #475569; line-height: 1.7;">
    This email is being sent as an
    <strong>HTML email</strong> using Nodemailer.
  </p>

  <a
    href="https://example.com"
    style="
      display: inline-block;
      margin-top: 16px;
      padding: 12px 20px;
      background-color: #2563eb;
      color: #ffffff;
      text-decoration: none;
      border-radius: 8px;
    "
  >
    Learn More
  </a>

  <p style="margin-top: 32px; color: #64748b;">
    Regards,<br />
    MailSender
  </p>
</div>`,
  },

  otp: {
    subject: "Your Verification Code",
    body: `Hello!

Your verification code is: 123456

This code will expire in 10 minutes. Please do not share this code with anyone.`,
  },

  booking: {
    subject: "Your Booking is Confirmed",
    body: `Hello!

Your booking has been confirmed successfully.

Booking ID: BK-10245
Date: 25 August 2026
Status: Confirmed

Thank you for choosing us.`,
  },

  attachment: {
    subject: "Requested Document Attached",
    body: `Hello!

Please find the requested document attached to this email.

If you have any questions, feel free to contact us.`,
  },

  welcome: {
    subject: "Welcome to MailSender!",
    body: `Hi!

Welcome aboard! Your account has been created successfully.

We're excited to have you with us.`,
  },

  reset: {
    subject: "Reset Your Password",
    body: `Hello!

We received a request to reset your password.

Use the password reset link provided in this email to create a new password.

If you did not request this, you can safely ignore this email.`,
  },

  notification: {
    subject: "Important Account Update",
    body: `Hello!

There is a new update regarding your account.

Please review the latest information when convenient.

Thank you.`,
  },
};