import {
  BellRing,
  CalendarCheck2,
  CodeXml,
  History,
  KeyRound,
  Mail,
  Paperclip,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const EmailTypes = [
  {
    id: "text",
    label: "Text Email",
    description: "Simple subject and message email",
    icon: Mail,
  },
  {
    id: "html",
    label: "HTML Email",
    description: "Styled and branded email layouts",
    icon: CodeXml,
  },
  {
    id: "otp",
    label: "OTP Verification",
    description: "Secure one-time verification codes",
    icon: ShieldCheck,
  },
  {
    id: "reset",
    label: "Password Reset",
    description: "Secure password recovery emails",
    icon: KeyRound,
  },
  {
    id: "booking",
    label: "Booking Confirmation",
    description: "Reservation and booking details",
    icon: CalendarCheck2,
  },
  {
    id: "attachment",
    label: "Email with Attachment",
    description: "Send files, PDFs and documents",
    icon: Paperclip,
  },
  {
    id: "welcome",
    label: "Welcome Email",
    description: "Account and onboarding messages",
    icon: Sparkles,
  },
  {
    id: "notification",
    label: "Notification Email",
    description: "Updates, alerts and status messages",
    icon: BellRing,
  },
];

export const Sidebar = () => {
  return (
    <div className="w-[280px] px-3 border-r border-slate-200 bg-white">
      <div className="flex items-center gap-1 px-3 py-2 border-b border-slate-200">
        <img src="./logo.png" alt="MailSender Logo" className="w-18 h-12" />
        <span className="text-[22px] text-slate-600 font-semibold tracking-tight mt-1">
          MailSender
        </span>
      </div>

      <div className="py-2">
        <div className="px-3 pb-2">
          <h3 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Email Types
          </h3>
          <p className="text-sm text-slate-500">
            Choose what you want to send
          </p>
        </div>

        <div className="max-h-[260px] overflow-y-auto pb-2 space-y-1 sidebar-scroll">
          {EmailTypes.map((mail) => {
            const Icon = mail.icon;
            return (
              <button
                key={mail.id}
                type="button"
                className="w-full flex items-center gap-3 text-slate-600 hover:bg-slate-50 rounded-xl p-3 transition text-left cursor-pointer"
              >
                <div className="p-2 bg-slate-100 rounded-lg">
                  <Icon size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    {mail.label}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-slate-400">
                    {mail.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button className="w-full flex items-center gap-3 text-slate-600 hover:bg-slate-50 rounded-xl my-1 px-3 py-2 transition text-left cursor-pointer">
          <div className="p-2 bg-slate-100 rounded-lg">
            <History size={20} />
          </div>
          <p className="text-sm font-medium">
            Sending History
          </p>
        </button>
        
        <button className="w-full flex items-center gap-3 text-slate-600 hover:bg-slate-50 rounded-xl px-3 py-2 transition text-left cursor-pointer">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Settings size={20} />
          </div>
          <p className="text-sm font-medium">
            Settings
          </p>
        </button>
        
        <div className="mt-2 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-100 to-white px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-200 text-blue-600 rounded-lg">
              <Mail size={14} />
            </div>
            <p className="text-sm font-semibold text-blue-900">
              Email Workspace
            </p>
          </div>
          
          <p className="text-xs leading-5 text-slate-500">
            Create and send transactional emails using ready-to-use formats for different delivery needs.
          </p>
        </div>
      </div>
    </div>
  );
};