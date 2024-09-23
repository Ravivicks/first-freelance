"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Component() {
  const t = useTranslations("termAndConditions");

  return (
    <div className="bg-background text-foreground">
      <div className="relative h-[300px] w-full my-4">
        <Image
          src="/images/term1.jpg"
          alt="term"
          fill
          className="object-fill rounded-md shadow-xl"
        />
      </div>
      <main className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
        <section className="mb-8">
          <p className="mb-4">{t("paragraphs.0")}</p>
          <h2 className="font-semibold text-lg my-4">{t("heading")}</h2>
          <ul className="list-decimal mb-4 space-y-4">
            {t.raw("list").map((item: any, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
