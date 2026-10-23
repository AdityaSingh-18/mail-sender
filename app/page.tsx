"use client";

import { useState } from "react";
import { EmailWorkspace } from "@/components/EmailWorkspace";
import { Sidebar, type SidebarSection } from "@/components/Sidebar";
import { SettingsPanel } from "@/components/SettingsPanel";
import type { EmailTypeId } from "@/data/email-types";

export default function Home() {
  const [selectedEmailType, setSelectedEmailType] = useState<EmailTypeId>("text");
  const [activeSection, setActiveSection] = useState<SidebarSection>("email");

  return (
    <div className="flex justify-center bg-[#f6f8fc]">
      <Sidebar
        selectedEmailType={selectedEmailType}
        activeSection={activeSection}
        onSelectEmailType={(id) => {
          setSelectedEmailType(id);
          setActiveSection("email");
        }}
        onSelectSection={setActiveSection}
      />
      {activeSection === "settings" ? <SettingsPanel /> : <EmailWorkspace selectedEmailType={selectedEmailType} />}
    </div>
  );
}