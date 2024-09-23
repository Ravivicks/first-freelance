"use client";
import {
  CreditCard,
  Building,
  Smartphone,
  FileText,
  Globe,
  Briefcase,
  DollarSign,
  CreditCardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";

const iconMapping: { [key: string]: React.ElementType } = {
  CreditCard,
  Building,
  Smartphone,
  FileText,
  Globe,
  Briefcase,
  DollarSign,
  CreditCardIcon,
};

export default function PaymentOptionsPage() {
  const { locale } = useParams();
  const t = useTranslations("paymentOptions");

  return (
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <header className="text-center mb-12 custom-bg p-4">
        <h1 className="text-3xl font-bold mb-4">{t("header.title")}</h1>
        <p className="text-lg text-gray-600">{t("header.description")}</p>
      </header>

      <Accordion type="single" collapsible className="mb-12">
        {t.raw("paymentOptions").map((option: any, index: number) => {
          const IconComponent = iconMapping[option.icon];
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                  <span>{option.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="prose max-w-none">
                  {option.content}
                  {option.list && (
                    <ul>
                      {option.list.map((item: any, iIndex: number) => (
                        <li key={iIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Card className="mb-12 custom-bg-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {t("chooseUsTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {t.raw("chooseUsPoints").map((point: any, index: number) => {
              return (
                <li key={index} className="flex items-start gap-2">
                  <DollarSign className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button size="lg" variant="destructive">
          {t("shoppingButton")}
        </Button>
      </div>
    </div>
  );
}
