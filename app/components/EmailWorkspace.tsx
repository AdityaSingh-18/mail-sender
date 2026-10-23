"use client";

import { useState } from "react";
import { emailTypes, type EmailTypeId } from "@/data/email-types";

import { 
  Paperclip,
  Send,
  Sparkles
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Compose",
    text: "Add recipient, subject and message"
  },
  {
    number: 2,
    title: "Process",
    text: "Send the request securely to the server"
  },
  {
    number: 3,
    title: "Deliver",
    text: "Route the message through Gmail SMTP"
  },
  {
    number: 4,
    title: "Inbox",
    text: "Deliver the email to the recipient"
  },
];

type EmailWorkspaceProps = {
  selectedEmailType: EmailTypeId;
  senderName: string;
  senderEmail: string;
  appPassword: string;
  onOpenSettings: () => void;
  subject: string;
  onSubjectChange: (value: string) => void;
  message: string;
  onMessageChange: (value: string) => void;
};

type SendFeedback = {
  type: "success" | "error";
  message: string;
  showSettings?: boolean;
};

export const EmailWorkspace = ({
  selectedEmailType,
  senderName,
  senderEmail,
  appPassword,
  onOpenSettings,
  subject,
  onSubjectChange,
  message,
  onMessageChange,
}: EmailWorkspaceProps) => {
  const [recipient, setRecipient] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendFeedback, setSendFeedback] = useState<SendFeedback | null>(null);

  const handleSend = async () => {
    setSendFeedback(null);

    if (!senderName.trim() || !senderEmail.trim()) {
      setSendFeedback({
        type: "error",
        message: "Configure your sender name and email in Settings.",
        showSettings: true,
      });
      return;
    }

    if (!appPassword.trim()) {
      setSendFeedback({
        type: "error",
        message: "Enter your Gmail App Password in Settings to send emails.",
        showSettings: true,
      });
      return;
    }

    if (!recipient.trim()) {
      setSendFeedback({
        type: "error",
        message: "Enter the recipient's email address.",
      });
      return;
    }

    if (!subject.trim() || !message.trim()) {
      setSendFeedback({
        type: "error",
        message: "Subject and message are required.",
      });
      return;
    }

    if (selectedEmailType === "attachment") {
      setSendFeedback({
        type: "error",
        message: "This email requires an attachment. Attachment sending is not available yet.",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipient: recipient.trim(),
          subject: subject.trim(),
          message,
          emailType: selectedEmailType,
          senderName: senderName.trim(),
          senderEmail: senderEmail.trim(),
          appPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to send the email.");
      }

      setSendFeedback({
        type: "success",
        message: `Email accepted by the mail server. Recipient: ${recipient.trim()}`,
      });
    } catch (error) {
      setSendFeedback({
        type: "error",
        message: error instanceof Error
          ? error.message
          : "Unable to send the email. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  const selectedType = emailTypes.find((type) => type.id === selectedEmailType) ?? emailTypes[0];
  const EmailIcon = selectedType.icon;
  
  return (
    <section className="flex-1 p-3 md:px-6">
      <div className="mb-3">
        <h2 className="text-2xl md:text-3xl text-slate-700 font-semibold tracking-tight">
          Send Mails
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Compose and send emails for verification, bookings, notifications, and more.
        </p>
      </div>
      
      <div className="flex gap-6">
        <div className="flex-1 border border-slate-200 bg-white shadow-sm rounded-2xl">
          <div className="flex items-center gap-3 p-4 md:px-6 border-b border-slate-100 bg-slate-50/70">
            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg">
              <EmailIcon size={22} />
            </div>
            
            <div>
              <h3 className="text-[15px] font-semibold text-slate-700">
                {selectedType.label}
              </h3>
              <p className="text-xs text-slate-400">
                {selectedType.description}
              </p>
            </div>
          </div>
          <div className="flex items-center border border-slate-100 px-4 md:px-6">
            <label className="w-[80px] shrink-0 py-2 text-sm text-slate-500">
              From
            </label>

            <div className="py-2">
              {senderEmail.trim() ? (
                <p className="truncate text-sm text-slate-700">
                  {senderName.trim() || senderEmail.trim()}{" "}
                  <span className="text-slate-400">
                    &lt;{senderEmail.trim()}&gt;
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="text-sm font-semibold text-blue-500 hover:text-blue-600"
                >
                  Configure sender
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center border border-slate-100 px-4 md:px-6">
            <label
              htmlFor="recipient"
              className="w-[80px] shrink-0 text-sm text-slate-500 py-2"
            >
              To
            </label>

            <input
              id="recipient"
              name="recipient"
              type="email"
              value={recipient}
              onChange={(event) => setRecipient(event.target.value)}
              placeholder="recipient@gmail.com"
              className="w-full py-2 text-sm outline-none placeholder:text-slate-300"
            />
          </div>
          <div className="flex items-center border border-slate-100 px-4 md:px-6">
            <label
              htmlFor="subject"
              className="w-[80px] shrink-0 text-sm text-slate-500 py-2"
            >
              Subject
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={subject}
              onChange={(event) => onSubjectChange(event.target.value)}
              placeholder="Enter email subject"
              className="w-full py-2 text-sm outline-none placeholder:text-slate-300"
            />
          </div>
          <textarea
            id="message"
            name="message"
            aria-label="Email message body"
            value={message}
            onChange={(event) => onMessageChange(event.target.value)}
            placeholder={
              selectedEmailType === "html"
                ? "Edit your HTML email..."
                : "Write your email..."
            }
            className={`min-h-60 w-full resize-none p-4 md:px-6 text-[15px] leading-6 text-slate-700 outline-none 
              placeholder:text-slate-300 sidebar-scroll ${selectedEmailType === "html" ? "font-mono" : ""}`}
          />
          <div className="flex items-center border-t border-slate-100 p-4 md:px-6">
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="flex items-center gap-2 rounded-full bg-blue-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? "Sending..." : "Send Email"}
              <Send size={16} />
            </button>
            
            <button
              type="button"
              title="Attachments will be added later"
              className="text-slate-500 ml-2 p-2.5 cursor-pointer rounded-full hover:bg-slate-100 transition"
            >
              <Paperclip size={20} />
            </button>
          </div>
          {sendFeedback && (
            <div
              role={sendFeedback.type === "error" ? "alert" : "status"}
              className={`mx-4 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border p-3 text-sm md:mx-6 ${
                sendFeedback.type === "success"
                  ? "border-blue-100 bg-blue-50 text-blue-800"
                  : "border-red-100 bg-red-50 text-red-700"
              }`}
            >
              <p>{sendFeedback.message}</p>

              {sendFeedback.showSettings && (
                <button
                  type="button"
                  onClick={onOpenSettings}
                  className="shrink-0 font-semibold underline underline-offset-2"
                >
                  Open Settings
                </button>
              )}
            </div>
          )}
        </div>
        
        <aside className="w-[280px] space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
                  Delivery Flow
                </p>
                
                <p className="mt-1 text-xs leading-4 text-slate-400">
                  Follow the message from compose to inbox
                </p>
              </div>
            </div>
            
            <div className="relative mt-4 space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="relative flex gap-3">
                  <div className="flex shrink-0 items-center justify-center relative z-10 h-9 w-9 
                    rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
                    {step.number}
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
              <div className="absolute left-4.5 top-0 h-50 w-[2px] bg-slate-200" />
            </div>
          </div>
          <div className="relative overflow-hidden p-4 rounded-2xl bg-slate-900 shadow-sm">
            <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-blue-400/20 blur-2xl" />
            <div className="flex gap-3 items-center">
              <div className="p-1.5 text-blue-400 rounded-xl border border-white/10 bg-white/5">
                <Sparkles size={18} />
              </div>
              <p className="text-[15px] text-white font-semibold">
                Smart Delivery System
              </p>
            </div>
            
            <p className="text-xs text-slate-400 mt-3 leading-5">
              Use flexible email formats for transactional messages, verification, bookings, attachments and branded communication.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}