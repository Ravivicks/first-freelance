import { QueryProvider } from "@/providers/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "300"] });

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <main className="max-w-10xl mx-auto">
          <NextIntlClientProvider messages={messages}>
            <QueryProvider>
              <Navbar />
              {children}
            </QueryProvider>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}
