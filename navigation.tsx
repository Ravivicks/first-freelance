import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "es", "id"] as const;

export const { Link, useRouter } = createSharedPathnamesNavigation({ locales });
