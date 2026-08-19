"use client";

import { useState } from "react";
import { toast } from "react-toastify";

import {
  Mail,
  Code2,
  ShieldCheck,
  CalendarCheck2,
  Paperclip,
  Sparkles,
  KeyRound,
  BellRing,
  Send,
} from "lucide-react";

type EmailType =
  | "text"
  | "html"
  | "otp"
  | "booking"
  | "attachment"
  | "welcome"
  | "reset"
  | "notification";

const emailTypes = [
  {
    id: "text" as EmailType,
    label: "Text Email",
    description: "Simple subject and message email",
    icon: Mail,
  },
  {
    id: "html" as EmailType,
    label: "HTML Email",
    description: "Styled and branded email layouts",
    icon: Code2,
  },
  {
    id: "otp" as EmailType,
    label: "OTP Verification",
    description: "Secure one-time verification codes",
    icon: ShieldCheck,
  },
  {
    id: "booking" as EmailType,
    label: "Booking Confirmation",
    description: "Reservation and booking details",
    icon: CalendarCheck2,
  },
  {
    id: "attachment" as EmailType,
    label: "Email with Attachment",
    description: "Send files, PDFs and documents",
    icon: Paperclip,
  },
  {
    id: "welcome" as EmailType,
    label: "Welcome Email",
    description: "Account and onboarding messages",
    icon: Sparkles,
  },
  {
    id: "reset" as EmailType,
    label: "Password Reset",
    description: "Secure password recovery emails",
    icon: KeyRound,
  },
  {
    id: "notification" as EmailType,
    label: "Notification Email",
    description: "Updates, alerts and status messages",
    icon: BellRing,
  },
];

const templates: Record<
  EmailType,
  {
    subject: string;
    message: string;
  }
> = {
  text: {
    subject: "Hello from MailSender",
    message: "Hello!\n\nThis is a simple text email sent using our email delivery system.\n\nRegards,\nMailSender",
  },

  html: {
    subject: "Explore Our Latest Update",
    message: 
`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
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
    message: "Hello!\n\nYour verification code is: 123456\n\nThis code will expire in 10 minutes. Please do not share this code with anyone.",
  },

  booking: {
    subject: "Your Booking is Confirmed",
    message: "Hello!\n\nYour booking has been confirmed successfully.\n\nBooking ID: BK-10245\nDate: 25 August 2026\nStatus: Confirmed\n\nThank you for choosing us.",
  },

  attachment: {
    subject: "Requested Document Attached",
    message: "Hello!\n\nPlease find the requested document attached to this email.\n\nIf you have any questions, feel free to contact us.",
  },

  welcome: {
    subject: "Welcome to MailSender!",
    message: "Hi!\n\nWelcome aboard! Your account has been created successfully.\n\nWe're excited to have you with us.",
  },

  reset: {
    subject: "Reset Your Password",
    message: "Hello!\n\nWe received a request to reset your password.\n\nUse the password reset link provided in this email to create a new password.\n\nIf you did not request this, you can safely ignore this email.",
  },

  notification: {
    subject: "Important Account Update",
    message: "Hello!\n\nThere is a new update regarding your account.\n\nPlease review the latest information when convenient.\n\nThank you.",
  },
};

export default function Home() {
  const [selectedType, setSelectedType] = useState<EmailType>("text");
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState(templates.text.subject);
  const [message, setMessage] = useState(templates.text.message);
  const [isSending, setIsSending] = useState(false);
  
  const handleTemplateChange = (
    type: EmailType,
  ) => {
    setSelectedType(type);
    setSubject(templates[type].subject);
    setMessage(templates[type].message);
  };
  
  const handleSend = async () => {
    if (!recipient.trim()) {
      toast.error("Recipient email is required");
      return;
    }

    if (!subject.trim()) {
      toast.error("Subject is required");
      return;
    }

    if (!message.trim()) {
      toast.error("Message is required");
      return;
    }

    const toastId = toast.loading(
      "Sending email...",
    );

    try {
      setIsSending(true);

      const response = await fetch(
        "/api/send-mail",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            recipient: recipient.trim(),
            subject: subject.trim(),
            message: message.trim(),
            emailType: selectedType,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to send email.",
        );
      }

      toast.update(toastId, {
        render: `Email sent successfully to ${recipient}`,
        type: "success",
        isLoading: false,
        autoClose: 4000,
      });
    } catch (error) {
      toast.update(toastId, {
        render:
          error instanceof Error
            ? error.message
            : "Failed to send email.",
        type: "error",
        isLoading: false,
        autoClose: 4500,
      });
    } finally {
      setIsSending(false);
    }
  };
  
  const selectedTemplate = emailTypes.find((item) => item.id === selectedType) ?? emailTypes[0];
  const SelectedIcon = selectedTemplate.icon;
  
  return (
    <main className="min-h-screen bg-[#f6f8fc] text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="hidden w-[280px] shrink-0 border-r border-slate-200 bg-white p-5 lg:block">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
              <Mail size={22} />
            </div>
            
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                MailSender
              </h1>
              
              <p className="text-xs text-slate-400">
                Nodemailer Playground
              </p>
            </div>
          </div>
          
          {/* Email Types */}
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Email Types
            </p>
            
            <p className="mt-1 text-sm text-slate-500">
              Choose what you want to send
            </p>
          </div>
          
          <div  className="max-h-[300px] space-y-2 overflow-y-auto pr-2 sidebar-scroll">
            {emailTypes.map(
              ({
                id,
                label,
                description,
                icon: Icon,
              }) => {
                const active = selectedType === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleTemplateChange(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        active
                          ? "bg-blue-100"
                          : "bg-slate-100"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {label}
                      </p>
                      
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {description}
                      </p>
                    </div>
                  </button>
                );
              },
            )}
          </div>
          
          {/* Email Workspace */}
          <div className="mt-4 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <Mail size={14} />
              </div>

              <p className="text-sm font-semibold text-blue-900">
                Email Workspace
              </p>
            </div>

            <p className="text-xs leading-5 text-slate-500">
              Create and send transactional emails
              using ready-to-use formats for different
              delivery needs.
            </p>
          </div>
        </aside>
        
        {/* Main Content */}
        <section className="min-w-0 flex-1 p-4 md:p-7">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Mail size={20} />
              </div>
              
              <div>
                <h1 className="font-semibold text-slate-900">
                  MailSender
                </h1>
                
                <p className="text-xs text-slate-400">
                  Nodemailer Playground
                </p>
              </div>
            </div>
            
            {/* Mobile Email Types */}
            <div className="mb-6 flex gap-2 sidebar-scroll overflow-x-auto pb-1 lg:hidden">
              {emailTypes.map(
                ({
                  id,
                  label,
                  icon: Icon,
                }) => (
                  <button
                    key={id}
                    onClick={() =>
                      handleTemplateChange(id)
                    }
                    className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                      selectedType === id
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ),
              )}
            </div>
            
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Send and test emails
              </h2>
              
              <p className="mt-2 text-sm text-slate-500">
                Create different email types and
                understand how they are sent through
                Nodemailer.
              </p>
            </div>
            
            <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-5 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <SelectedIcon size={18} />
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {selectedTemplate.label}
                    </h3>
                    
                    <p className="text-xs text-slate-400">
                      {selectedTemplate.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center border-b border-slate-100 px-5">
                  <label className="w-[80px] shrink-0 text-sm text-slate-400">
                    To
                  </label>
                  
                  <input
                    type="email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="recipient@gmail.com"
                    className="w-full py-2 text-sm text-slate-800 outline-none placeholder:text-slate-300"
                  />
                </div>
                
                <div className="flex items-center border-b border-slate-100 px-5">
                  <label className="w-[80px] shrink-0 text-sm text-slate-400">
                    Subject
                  </label>
                  
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter email subject"
                    className="w-full py-2 text-sm font-medium text-slate-700 outline-none placeholder:text-slate-300"
                  />
                </div>
                
                <textarea
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder={
                    selectedType === "html"
                      ? "Write your HTML email..."
                      : "Write your email..."
                  }
                  className={`min-h-[260px] w-full resize-none px-6 py-6 text-[15px] leading-7 text-slate-700 outline-none placeholder:text-slate-300 ${
                    selectedType === "html"
                      ? "font-mono"
                      : ""
                  }`}
                />
                                
                {/* Bottom Actions */}
                <div className="flex items-center border-t border-slate-100 px-5 py-4">
                  <button
                    onClick={handleSend}
                    disabled={isSending}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSending
                      ? "Sending..."
                      : "Send Email"}
                    <Send size={16} />
                  </button>
                  
                  <button
                    type="button"
                    title="Attachments will be added later"
                    className="ml-2 rounded-full p-2.5 text-slate-500 transition hover:bg-slate-100"
                  >
                    <Paperclip size={19} />
                  </button>
                </div>
              </div>
              
              {/* Information */}
              <aside className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Delivery Flow
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Follow the message from compose to inbox
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <FlowItem
                      number="1"
                      title="Compose"
                      text="Add recipient, subject and message"
                    />

                    <FlowItem
                      number="2"
                      title="Process"
                      text="Send the request securely to the server"
                    />

                    <FlowItem
                      number="3"
                      title="Deliver"
                      text="Route the message through Gmail SMTP"
                    />

                    <FlowItem
                      number="4"
                      title="Inbox"
                      text="Deliver the email to the recipient"
                      last
                    />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white shadow-sm">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <Sparkles
                          size={18}
                          className="text-blue-400"
                        />
                      </div>

                      <h3 className="font-semibold">
                        Smart Email Delivery
                      </h3>
                    </div>

                    <p className="mt-3 text-xs leading-5 text-slate-400">
                      Use flexible email formats for transactional
                      messages, verification, bookings, attachments
                      and branded communication.
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function FlowItem({
  number,
  title,
  text,
  last = false,
}: {
  number: string;
  title: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-3">
      {!last && (
        <div className="absolute left-[17px] top-9 h-9 w-px bg-slate-200" />
      )}
      
      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
        {number}
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-800">
          {title}
        </p>
        
        <p className="mt-0.5 text-xs text-slate-400">
          {text}
        </p>
      </div>
    </div>
  );
}