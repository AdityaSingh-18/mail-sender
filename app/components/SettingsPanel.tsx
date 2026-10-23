"use client";

import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";

import {
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Plug,
  Save,
  Settings,
  UserRound,
} from "lucide-react";

type SettingsPanelProps = {
  senderName: string;
  onSenderNameChange: (value: string) => void;
  senderEmail: string;
  onSenderEmailChange: (value: string) => void;
  appPassword: string;
  onAppPasswordChange: (value: string) => void;
  onSaveSettings: () => boolean;
};

export const SettingsPanel = ({
  senderName,
  onSenderNameChange,
  senderEmail,
  onSenderEmailChange,
  appPassword,
  onAppPasswordChange,
  onSaveSettings,
}: SettingsPanelProps) => {
  const [showAppPassword, setShowAppPassword] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  
  const handleSave = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!senderName.trim()) {
      toast.error("Please enter a sender name.");
      return;
    }

    if (!senderEmail.trim()) {
      toast.error("Please enter a sender email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(senderEmail.trim())) {
      toast.error("Please enter a valid sender email address.");
      return;
    }

    if (!onSaveSettings()) {
      toast.error("Unable to save settings in this browser.");
      return;
    }

    toast.success("Sender settings saved successfully.");
  };

  const handleTestConnection = async () => {
    if (!senderEmail.trim()) {
      toast.error("Please enter a sender email address.");
      return;
    }

    if (!appPassword.trim()) {
      toast.error("Please enter your Gmail App Password.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(senderEmail.trim())) {
      toast.error("Please enter a valid sender email address.");
      return;
    }

    setIsTesting(true);

    const toastId = toast.loading("Testing Gmail connection...");
    try {
      const response = await fetch("/api/test-smtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderEmail: senderEmail.trim(),
          appPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Unable to verify your Gmail connection.");
      }

      toast.success(data.message || "Gmail connection verified successfully.", { id: toastId });
    } catch (error) {
      toast.error(error instanceof Error
        ? error.message
        : "Unable to connect to Gmail. Please try again.",
        { id: toastId },
      );
    } finally {
      setIsTesting(false);
    }
  };

  const senderInitials = senderName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "YN";

  return (
    <section className="flex-1 p-3 md:px-6 dark:bg-slate-950">
      <div className="mb-3">
        <h2 className="text-2xl md:text-3xl text-slate-700 font-semibold tracking-tight dark:text-slate-100">
          Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Manage your sending account and sender identity.
        </p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 border border-slate-200 bg-white shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 p-4 md:px-6 border-b border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg dark:bg-blue-500/15 dark:text-blue-300">
              <Settings size={22} />
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-slate-700 dark:text-slate-100">
                Sender Configuration
              </h3>

              <p className="text-xs text-slate-400 dark:text-slate-500">
                Configure the account used for outgoing emails.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSave}
            className="space-y-4 p-4 md:px-6"
          >
            <div>
              <label
                htmlFor="senderName"
                className="mb-1.5 block text-sm text-slate-500 dark:text-slate-400"
              >
                Sender Name
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 transition 
                focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 
                dark:bg-slate-900 dark:focus-within:border-blue-500 dark:focus-within:ring-blue-500/20"
              >
                <UserRound size={18} className="shrink-0 text-slate-400 dark:text-slate-500" />

                <input
                  id="senderName"
                  name="senderName"
                  type="text"
                  autoComplete="name"
                  value={senderName}
                  onChange={(event) => onSenderNameChange(event.target.value)}
                  placeholder="Your name or business name"
                  className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300 
                    dark:bg-transparent dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="senderEmail"
                className="mb-1.5 block text-sm text-slate-500 dark:text-slate-400"
              >
                Sender Email
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 transition 
                focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 
                dark:bg-slate-900 dark:focus-within:border-blue-500 dark:focus-within:ring-blue-500/20"
              >
                <Mail size={18} className="shrink-0 text-slate-400 dark:text-slate-500" />

                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  autoComplete="email"
                  value={senderEmail}
                  onChange={(event) => onSenderEmailChange(event.target.value)}
                  placeholder="your-email@gmail.com"
                  className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300 
                    dark:bg-transparent dark:text-slate-100 dark:placeholder:text-slate-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="appPassword"
                className="mb-1.5 block text-sm text-slate-500 dark:text-slate-400"
              >
                Gmail App Password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 transition 
                focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 dark:border-slate-700 
                dark:bg-slate-900 dark:focus-within:border-blue-500 dark:focus-within:ring-blue-500/20"
              >
                <KeyRound size={18} className="shrink-0 text-slate-400 dark:text-slate-500" />

                <input
                  id="appPassword"
                  name="appPassword"
                  type={showAppPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={appPassword}
                  onChange={(event) => onAppPasswordChange(event.target.value)}
                  placeholder="Enter your App Password"
                  className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300 
                    dark:bg-transparent dark:text-slate-100 dark:placeholder:text-slate-500"
                />

                <button
                  type="button"
                  onClick={() => setShowAppPassword((visible) => !visible)}
                  aria-label={showAppPassword ? "Hide App Password" : "Show App Password"}
                  className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 
                    hover:text-slate-600 cursor-pointer"
                >
                  {showAppPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Use a Google App Password instead of your regular password.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold cursor-pointer 
                  text-white transition hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 active:scale-[0.98]"
              >
                <Save size={16} />
                Save Settings
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm cursor-pointer 
                  font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed 
                  disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Plug size={16} />
                {isTesting ? "Testing..." : "Test Connection"}
              </button>
            </div>
          </form>
        </div>

        <aside className="w-[280px] space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Sender Preview
            </p>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              How your sender identity will appear.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold 
                text-blue-700 dark:bg-blue-500/15 dark:text-blue-300">
                {senderInitials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-100">
                  {senderName.trim() || "Your Name"}
                </p>

                <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                  {senderEmail.trim() || "you@example.com"}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <p className="text-xs text-slate-400 dark:text-slate-500">From</p>
              <p className="mt-1 break-words text-sm text-slate-600 dark:text-slate-300">
                {senderName.trim() || "Your Name"}{" "}
                <span className="text-slate-400 dark:text-slate-500">
                  ({senderEmail.trim() || "you@example.com"})
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300">
                <Mail size={17} />
              </div>

              <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-100">
                Gmail SMTP
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">
              Outgoing emails will use the Gmail account configured in these settings.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};