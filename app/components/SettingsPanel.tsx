"use client";

import { SyntheticEvent, useState } from "react";
import {
  AlertCircle,
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
  const [validationError, setValidationError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const clearFeedback = () => {
    setValidationError("");
    setStatusMessage("");
  };

  const validateSettings = () => {
    if (!senderName.trim()) {
      setValidationError("Please enter a sender name.");
      return false;
    }

    if (!senderEmail.trim()) {
      setValidationError("Please enter a sender email address.");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(senderEmail.trim())) {
      setValidationError("Please enter a valid sender email address.");
      return false;
    }

    if (!appPassword.trim()) {
      setValidationError("Please enter your Gmail App Password.");
      return false;
    }

    return true;
  };

  const handleSave = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearFeedback();

    if (!senderName.trim()) {
      setValidationError("Please enter a sender name.");
      return;
    }

    if (!senderEmail.trim()) {
      setValidationError("Please enter a sender email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(senderEmail.trim())) {
      setValidationError("Please enter a valid sender email address.");
      return;
    }

    if (!onSaveSettings()) {
      setStatusMessage("Unable to save settings in this browser.");
      return;
    }

    setStatusMessage("Sender settings saved successfully.");
  };

  const handleTestConnection = () => {
    clearFeedback();

    if (!senderEmail.trim() || !appPassword.trim()) {
      setValidationError("Enter your sender email and App Password first.");
      return;
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
    <section className="flex-1 p-3 md:px-6">
      <div className="mb-3">
        <h2 className="text-2xl md:text-3xl text-slate-700 font-semibold tracking-tight">
          Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your sending account and sender identity.
        </p>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 border border-slate-200 bg-white shadow-sm rounded-2xl">
          <div className="flex items-center gap-3 p-4 md:px-6 border-b border-slate-100 bg-slate-50/70">
            <div className="p-2 bg-blue-100 text-blue-500 rounded-lg">
              <Settings size={22} />
            </div>

            <div>
              <h3 className="text-[15px] font-semibold text-slate-700">
                Sender Configuration
              </h3>

              <p className="text-xs text-slate-400">
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
                className="mb-1.5 block text-sm text-slate-500"
              >
                Sender Name
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <UserRound size={18} className="shrink-0 text-slate-400" />

                <input
                  id="senderName"
                  name="senderName"
                  type="text"
                  autoComplete="name"
                  value={senderName}
                  onChange={(event) => {
                    onSenderNameChange(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="Your name or business name"
                  className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="senderEmail"
                className="mb-1.5 block text-sm text-slate-500"
              >
                Sender Email
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <Mail size={18} className="shrink-0 text-slate-400" />

                <input
                  id="senderEmail"
                  name="senderEmail"
                  type="email"
                  autoComplete="email"
                  value={senderEmail}
                  onChange={(event) => {
                    onSenderEmailChange(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="your-email@gmail.com"
                  className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="appPassword"
                className="mb-1.5 block text-sm text-slate-500"
              >
                Gmail App Password
              </label>

              <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
                <KeyRound size={18} className="shrink-0 text-slate-400" />

                <input
                  id="appPassword"
                  name="appPassword"
                  type={showAppPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={appPassword}
                  onChange={(event) => {
                    onAppPasswordChange(event.target.value);
                    clearFeedback();
                  }}
                  placeholder="Enter your App Password"
                  className="w-full py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-300"
                />

                <button
                  type="button"
                  onClick={() => setShowAppPassword((visible) => !visible)}
                  aria-label={showAppPassword
                    ? "Hide App Password"
                    : "Show App Password"
                  }
                  className="shrink-0 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                >
                  {showAppPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Use a Google App Password instead of your regular password.
              </p>
            </div>

            {validationError && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-100 bg-red-50 p-2.5 text-sm text-red-700"
              >
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <p>{validationError}</p>
              </div>
            )}

            {statusMessage && (
              <p
                role="status"
                className="rounded-lg border border-blue-100 bg-blue-50 p-2.5 text-sm text-blue-800"
              >
                {statusMessage}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-[0.98]"
              >
                <Save size={16} />
                Save Settings
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                <Plug size={16} />
                Test Connection
              </button>
            </div>
          </form>
        </div>

        <aside className="w-[280px] space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              Sender Preview
            </p>

            <p className="mt-1 text-xs text-slate-400">
              How your sender identity will appear.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                {senderInitials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-700">
                  {senderName.trim() || "Your Name"}
                </p>

                <p className="truncate text-xs text-slate-400">
                  {senderEmail.trim() || "you@example.com"}
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs text-slate-400">From</p>
              <p className="mt-1 break-words text-sm text-slate-600">
                {senderName.trim() || "Your Name"}{" "}
                <span className="text-slate-400">
                  ({senderEmail.trim() || "you@example.com"})
                </span>
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-100 p-2 text-blue-600">
                <Mail size={17} />
              </div>

              <h3 className="text-sm font-semibold text-slate-700">
                Gmail SMTP
              </h3>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500">
              Outgoing emails will use the Gmail account configured in these settings.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
};