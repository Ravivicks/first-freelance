import { QueryProvider } from "@/providers/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import MenuBarNew from "@/components/MenuBarNew";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang={locale}>
        <body className={inter.className}>
          <main className="max-w-10xl mx-16">
            <NextIntlClientProvider messages={messages}>
              <QueryProvider>
                <Navbar />
                <div className="hidden md:block">
                  <MenuBarNew />
                </div>
                {children}
                <Footer />
              </QueryProvider>
            </NextIntlClientProvider>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
