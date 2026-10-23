import { createGmailTransport } from "@/lib/gmail-transporter";
import { isSameOriginRequest } from "@/lib/request-security";

export const runtime = "nodejs";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
      { message: "Invalid request." },
      { status: 400 },
    );
  }

  const senderEmail = typeof body.senderEmail === "string"
    ? body.senderEmail.trim()
    : "";

  const appPassword = typeof body.appPassword === "string"
    ? body.appPassword.trim()
    : "";

  if (!isValidEmail(senderEmail) || !appPassword) {
    return Response.json(
      { message: "Enter a valid sender email and App Password." },
      { status: 400 },
    );
  }

  const transporter = createGmailTransport(senderEmail, appPassword);
  try {
    await transporter.verify();

    return Response.json({
      message: "Gmail SMTP connection verified.",
    });
  } catch {
    return Response.json(
      {
        message: "Unable to connect to Gmail. Check your sender email and App Password.",
      },
      { status: 502 },
    );
  } finally {
    transporter.close();
  }
}