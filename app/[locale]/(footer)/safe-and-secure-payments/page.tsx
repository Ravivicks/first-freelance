"use client";
import {
  Shield,
  CreditCardIcon,
  Building,
  Smartphone,
  Lock,
  FileText,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";

const iconMapping: { [key: string]: React.ElementType } = {
  Shield,
  CreditCardIcon,
  Building,
  Smartphone,
  Lock,
  FileText,
  UserCheck,
  HelpCircle,
};

export default function SecurePaymentsPage() {
  const t = useTranslations("safeAndSecurePayments");

  return (
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <header className="text-center mb-12">
        <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-3xl font-bold mb-4">{t("header.title")}</h1>
        <p className="text-lg text-gray-600">{t("header.description")}</p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {t.raw("securityFeatures").map((feature: any, index: number) => {
          const IconComponent = iconMapping[feature.icon];
          return (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                {IconComponent && (
                  <IconComponent className="w-8 h-8 mb-2 text-destructive" />
                )}
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {t("paymentOptions.title")}
        </h2>
        <p className="mb-4">{t("paymentOptions.description")}</p>
        <ul className="list-disc pl-6 space-y-2">
          {t.raw("paymentOptions.options").map((option: any, index: number) => (
            <li key={index}>
              <strong>{option.title}:</strong> {option.description}
            </li>
          ))}
        </ul>
        <p className="mt-4">{t("paymentOptions.conclusion")}</p>
      </section>

      <section className="custom-bg-1 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t("chooseUsTitle")}</h2>
        <ul className="space-y-2">
          {t.raw("chooseUsPoints").map((point: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <Shield className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="text-center">
        <Button size="lg" variant="destructive">
          <Link href="/">Start Secure Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
