"use client";

import { useEffect, useState } from "react";
import { EmailWorkspace } from "@/components/EmailWorkspace";
import { Sidebar, type SidebarSection } from "@/components/Sidebar";
import { SettingsPanel } from "@/components/SettingsPanel";
import type { EmailTypeId } from "@/data/email-types";
import { emailTemplates } from "@/data/email-templates";
import {loadSenderProfile, saveSenderProfile} from "@/utils/sender-settings";

export default function Home() {
  const [selectedEmailType, setSelectedEmailType] = useState<EmailTypeId>("text");
  const [activeSection, setActiveSection] = useState<SidebarSection>("email");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [subject, setSubject] = useState(emailTemplates.text.subject);
  const [message, setMessage] = useState(emailTemplates.text.body);
  
  useEffect(() => {
    const profile = loadSenderProfile();

    setSenderName(profile.senderName);
    setSenderEmail(profile.senderEmail);
  }, []);

  const handleSaveSettings = () => {
    const profile = {
      senderName: senderName.trim(),
      senderEmail: senderEmail.trim(),
    };

    const saved = saveSenderProfile(profile);
    if (saved) {
      setSenderName(profile.senderName);
      setSenderEmail(profile.senderEmail);
    }

    return saved;
  };

  return (
    <div className="flex justify-center bg-[#f6f8fc]">
      <Sidebar
        selectedEmailType={selectedEmailType}
        activeSection={activeSection}
        onSelectEmailType={(id) => {
          if (id !== selectedEmailType) {
            setSubject(emailTemplates[id].subject);
            setMessage(emailTemplates[id].body);
          }

          setSelectedEmailType(id);
          setActiveSection("email");
        }}
        onSelectSection={setActiveSection}
      />

      {activeSection === "settings" ? (
        <SettingsPanel
          senderName={senderName}
          onSenderNameChange={setSenderName}
          senderEmail={senderEmail}
          onSenderEmailChange={setSenderEmail}
          appPassword={appPassword}
          onAppPasswordChange={setAppPassword}
          onSaveSettings={handleSaveSettings}
        />
      ) : (
        <EmailWorkspace
          selectedEmailType={selectedEmailType}
          senderName={senderName}
          senderEmail={senderEmail}
          appPassword={appPassword}
          onOpenSettings={() => setActiveSection("settings")}
          subject={subject}
          onSubjectChange={setSubject}
          message={message}
          onMessageChange={setMessage}
        />
      )}
    </div>
  );
}