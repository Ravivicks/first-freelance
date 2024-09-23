"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Component() {
  // Using Next Intl for translations
  const t = useTranslations("privacyPolicy");

  return (
    <div className="bg-background text-foreground">
      <div className="relative h-[300px] w-full my-4">
        <Image
          src="/images/privacy-policy-banner.jpg"
          alt="term"
          fill
          className="object-fill rounded-md shadow-xl"
        />
      </div>
      <div className="container mx-auto px-4 md:px-6 max-w-5xl py-12 md:py-16">
        <h1 className="text-3xl font-bold mb-6">{t("heading")}</h1>
        <div className="space-y-8">
          {t.raw("sections").map((section: any, index: number) => (
            <section key={index}>
              <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
              <p className="text-muted-foreground">{section.paragraph}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
