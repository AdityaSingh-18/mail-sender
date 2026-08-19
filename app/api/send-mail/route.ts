import { NextResponse } from "next/server";
import {
  sendEmail,
  type EmailType,
} from "../../lib/mailer";

export const runtime = "nodejs";

const allowedEmailTypes: EmailType[] = [
  "text",
  "html",
  "otp",
  "booking",
  "attachment",
  "welcome",
  "reset",
  "notification",
];

export async function POST(
  request: Request,
) {
  try {
    const body = await request.json();

    const {
      recipient,
      subject,
      message,
      emailType,
    } = body;

    if (
      typeof recipient !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string" ||
      !recipient.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Recipient, subject and message are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (
      typeof emailType !== "string" ||
      !allowedEmailTypes.includes(
        emailType as EmailType,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email type.",
        },
        {
          status: 400,
        },
      );
    }

    await sendEmail({
      to: recipient.trim(),
      subject: subject.trim(),
      message: message.trim(),
      emailType: emailType as EmailType,
    });

    return NextResponse.json(
      {
        success: true,
        message: `${getEmailTypeLabel(
          emailType as EmailType,
        )} email accepted for delivery.`,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Send email error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to send email. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}

function getEmailTypeLabel(
  emailType: EmailType,
) {
  const labels: Record<EmailType, string> = {
    text: "Text",
    html: "HTML",
    otp: "OTP",
    booking: "Booking",
    attachment: "Attachment",
    welcome: "Welcome",
    reset: "Password reset",
    notification: "Notification",
  };

  return labels[emailType];
}