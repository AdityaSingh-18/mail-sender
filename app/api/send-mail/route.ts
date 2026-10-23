import { createGmailTransport } from "@/lib/gmail-transporter";
import { isSameOriginRequest } from "@/lib/request-security";
import { sanitizeEmailHtml } from "@/lib/sanitize-email-html";

export const runtime = "nodejs";

const emailTypes = new Set([
  "text",
  "html",
  "otp",
  "reset",
  "booking",
  "attachment",
  "welcome",
  "notification",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(
      /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
      "$2 ($1)",
    )
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|h1|h2|h3|li)>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return Response.json(
      { message: "Request not allowed." },
      { status: 403 },
    );
  }

  const body: unknown = await request.json().catch(() => null);
  if (!isRecord(body)) {
    return Response.json(
      { message: "Invalid email request." },
      { status: 400 },
    );
  }

  const recipient = typeof body.recipient === "string" ? body.recipient.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message : "";
  const emailType = typeof body.emailType === "string" ? body.emailType : "";
  const senderName = typeof body.senderName === "string" ? body.senderName.trim() : "";
  const senderEmail = typeof body.senderEmail === "string" ? body.senderEmail.trim() : "";
  const appPassword = typeof body.appPassword === "string" ? body.appPassword : "";

  if (
    !isValidEmail(recipient) ||
    !isValidEmail(senderEmail) ||
    !senderName ||
    senderName.length > 150 ||
    /[\r\n]/.test(senderName) ||
    !subject ||
    subject.length > 200 ||
    /[\r\n]/.test(subject) ||
    !message.trim() ||
    message.length > 100000 ||
    !appPassword.trim() ||
    !emailTypes.has(emailType)
  ) {
    return Response.json(
      { message: "Check the recipient, sender, subject, and message fields." },
      { status: 400 },
    );
  }

  if (emailType === "attachment") {
    return Response.json(
      {
        message: "This email requires an attachment. Attachment sending is not available yet.",
      },
      { status: 400 },
    );
  }

  const sanitizedHtml = emailType === "html" ? sanitizeEmailHtml(message) : "";
  if (emailType === "html" && !sanitizedHtml.trim()) {
    return Response.json(
      { message: "Please provide valid HTML email content." },
      { status: 400 },
    );
  }

  const transporter = createGmailTransport(senderEmail, appPassword);
  try {
    const content = emailType === "html"
    ? {
        html: sanitizedHtml,
        text: htmlToText(sanitizedHtml),
      }
    : { text: message };

    const info = await transporter.sendMail({
      from: {
        name: senderName,
        address: senderEmail,
      },
      to: recipient,
      subject,
      ...content,
    });

    return Response.json({
      message: "Email accepted by the mail server.",
      messageId: info.messageId,
    });
  } catch {
    return Response.json(
      {
        message: "Email could not be sent. Check your Gmail settings and try again.",
      },
      { status: 502 },
    );
  } finally {
    transporter.close();
  }
}