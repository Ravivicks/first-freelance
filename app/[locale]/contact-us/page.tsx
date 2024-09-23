"use client";
import { useGetContacts } from "@/features/contact/use-get-contacts";
import Loader from "@/components/Loader";
import { Mail, Phone, MapPin } from "lucide-react"; // Import lucide-react icons
import { useTranslations } from "next-intl"; // Import useTranslations
import { ContactForm } from "@/components/ContactForm";

export default function Component() {
  const { data, isLoading } = useGetContacts();
  const t = useTranslations("contact"); // Use translations for the "contact" namespace

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <section className="w-full py-12 md:py-20 lg:py-24 bg-[url('/images/bg-con.jpg?height=200&width=1600')] h-[300px] bg-cover bg-center my-4 rounded-md">
        <div className="container px-4 md:px-6">
          <div className="max-w-2xl space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              {t("header.title")}
            </h1>
            <p className="text-gray-300 md:text-xl ">
              {t("header.description")}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-6 border p-5 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("form.title")}
            </h2>
            <ContactForm t={t} />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              {t("contactInformation.title")}
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">
                    {data?.[0]?.company || t("contactInformation.company")}
                  </p>
                  <p className="text-muted-foreground">
                    {data?.[0]?.address || t("contactInformation.address")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">
                    {data?.[0]?.phone || t("contactInformation.phone")}
                  </p>
                  <p className="text-muted-foreground">
                    {data?.[0]?.workingHours ||
                      t("contactInformation.workingHours")}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="mt-1 h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">
                    {data?.[0]?.email || t("contactInformation.email")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("contactInformation.emailNote")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
