import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = [
  "en",
  "es",
  "ca",
  "fr",
  "it",
  "ko",
  "pt",
  "ro",
] as const;

export const { Link, useRouter } = createSharedPathnamesNavigation({ locales });
