import {
  BellRing,
  CalendarCheck2,
  CodeXml,
  KeyRound,
  Mail,
  Paperclip,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type EmailTypeId =
  | "text"
  | "html"
  | "otp"
  | "reset"
  | "booking"
  | "attachment"
  | "welcome"
  | "notification";

export type EmailTypeOption = {
  id: EmailTypeId;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const emailTypes: EmailTypeOption[] = [
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