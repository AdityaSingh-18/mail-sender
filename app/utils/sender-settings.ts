export type SenderProfile = {
  senderName: string;
  senderEmail: string;
};

const STORAGE_KEY = "mailsender.sender-profile";

export function loadSenderProfile(): SenderProfile {
  const emptyProfile: SenderProfile = {
    senderName: "",
    senderEmail: "",
  };

  if (typeof window === "undefined") {
    return emptyProfile;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return emptyProfile;
    }

    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== "object" || parsed === null) {
      return emptyProfile;
    }

    const profile = parsed as Record<string, unknown>;
    return {
      senderName: typeof profile.senderName === "string"
        ? profile.senderName
        : "",
      senderEmail: typeof profile.senderEmail === "string"
        ? profile.senderEmail
        : "",
    };
  } catch {
    return emptyProfile;
  }
}

export function saveSenderProfile(
  profile: SenderProfile,
): boolean {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(profile),
    );

    return true;
  } catch {
    return false;
  }
}