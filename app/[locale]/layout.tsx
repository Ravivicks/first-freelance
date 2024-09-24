import { QueryProvider } from "@/providers/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import MenuBarNew from "@/components/MenuBarNew";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import SheetProvider from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
import TopNav from "@/components/TopNav";
import Script from "next/script";
import MobileTopNav from "@/components/MobileTopNav";
import { Metadata } from "next";

const inter = Poppins({ subsets: ["latin"], weight: ["100", "300"] });
export const metadata: Metadata = {
  title: "Automation Ecom Global",
  description: "",
};

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
          <main className="max-w-10xl mx-6 md:mx-16">
            <NextIntlClientProvider messages={messages}>
              <QueryProvider>
                <SheetProvider />
                <Toaster position="top-right" duration={500} />
                <div className="hidden md:block">
                  <TopNav />
                </div>
                <div className="blok md:hidden">
                  <MobileTopNav />
                </div>
                <Navbar />
                <p className="pl-8 -mt-8 mb-5 text-xs font-semibold underline hidden md:block">
                  We Strive To Discipline Industry Spare Part Requirements.
                </p>
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </ClerkProvider>
  );
}
