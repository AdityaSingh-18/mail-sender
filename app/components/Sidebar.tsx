import { History, Mail, Settings } from "lucide-react";
import { emailTypes, type EmailTypeId } from "@/data/email-types";

export type SidebarSection = "email" | "history" | "settings";

type SidebarProps = {
  selectedEmailType: EmailTypeId;
  activeSection: SidebarSection;
  onSelectEmailType: (id: EmailTypeId) => void;
  onSelectSection: (section: "history" | "settings") => void;
};

export const Sidebar = ({
  selectedEmailType,
  activeSection,
  onSelectEmailType,
  onSelectSection,
}: SidebarProps) => {
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
          {emailTypes.map((mail) => {
            const Icon = mail.icon;
            const isSelected = activeSection === "email" && selectedEmailType === mail.id;

            return (
              <button
                key={mail.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelectEmailType(mail.id)}
                className={`w-full flex items-center gap-3 rounded-xl p-3 transition text-left cursor-pointer 
                  ${isSelected ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? "bg-blue-100" : "bg-slate-100"}`}>
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

        <button
          type="button"
          aria-pressed={activeSection === "history"}
          onClick={() => onSelectSection("history")}
          className={`w-full flex items-center gap-3 rounded-xl my-1 px-3 py-2 transition text-left cursor-pointer 
            ${activeSection === "history" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <div className={`p-2 rounded-lg ${activeSection === "history" ? "bg-blue-100 text-blue-600" : "bg-slate-100"}`}>
            <History size={20} />
          </div>
          <p className="text-sm font-medium">
            Sending History
          </p>
        </button>

        <button
          type="button"
          aria-pressed={activeSection === "settings"}
          onClick={() => onSelectSection("settings")}
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 transition text-left cursor-pointer 
            ${activeSection === "settings" ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-50"}`}
        >
          <div className={`p-2 rounded-lg ${activeSection === "settings" ? "bg-blue-100 text-blue-600" : "bg-slate-100"}`}>
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