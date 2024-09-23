"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeftRight,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Globe,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";

const iconMapping: { [key: string]: React.ElementType } = {
  ArrowLeftRight,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Globe,
};

export default function ReturnAndExchange() {
  const [orderNumber, setOrderNumber] = useState("");
  const { locale } = useParams();
  const t = useTranslations("returnAndExchange");

  const handleInitiateReturn = () => {
    console.log(`Initiating return for order number: ${orderNumber}`);
  };

  return (
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("header")}</h1>

      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>{t("commitmentTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t("commitmentText")}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>{t("policyCardTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              {t.raw("policySections").map((item: any, index: number) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {index + 1}. {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {item.content.map((contentItem: string, iIndex: number) => (
                      <p key={iIndex}>{contentItem}</p>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("benefitsTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.raw("benefits").map((item: any, index: number) => {
              const IconComponent = iconMapping[item.icon];
              return (
                <div className="flex items-center space-x-2" key={index}>
                  {IconComponent && (
                    <IconComponent className="h-6 w-6 text-destructive" />
                  )}
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
