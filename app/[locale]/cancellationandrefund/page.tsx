"use client";
import { useSupportOpen } from "@/hooks/use-support-open";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Component() {
  const { onOpen } = useSupportOpen();
  const t = useTranslations("cancellationAndRefund");

  return (
    <div>
      <div className="relative h-[300px] w-full my-4">
        <Image
          src="/images/refund.webp"
          alt={t("heading")}
          fill
          className="object-fill rounded-md shadow-xl"
        />
      </div>
      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("heading")}
            </h1>
            <p className="mt-4 text-muted-foreground">{t("introduction")}</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{t("section1.title")}</h2>
            <ul className="space-y-2 text-muted-foreground">
              {t.raw("section1.items").map((item: any, itemIndex: number) => (
                <li key={itemIndex}>
                  <strong>{item.strong}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{t("section2.title")}</h2>
            <ul className="space-y-2 text-muted-foreground">
              {t.raw("section2.items").map((item: any, itemIndex: number) => (
                <li key={itemIndex}>
                  <strong>{item.strong}</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{t("section3.title")}</h2>
            <p className="text-muted-foreground">{t("section3.paragraph")}</p>
            <div className="flex gap-2 sm:flex-row sm:items-center">
              {t
                .raw("section3.contactLinks")
                .map((link: any, linkIndex: any) => (
                  <p
                    key={linkIndex}
                    onClick={() => onOpen()}
                    className={`inline-flex cursor-pointer items-center rounded-xl ${
                      link.icon === "MailOpenIcon"
                        ? "bg-destructive"
                        : "border border-input bg-background"
                    } px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    {link.icon === "MailOpenIcon" ? (
                      <MailOpenIcon className="mr-2 h-5 w-5" />
                    ) : (
                      <PhoneIcon className="mr-2 h-5 w-5" />
                    )}
                    {link.text}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons remain unchanged

function MailOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
