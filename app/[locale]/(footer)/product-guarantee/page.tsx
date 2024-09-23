"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Check } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";

export default function Component() {
  const { onOpen } = useCommonEnquiry();
  const t = useTranslations("productGaurantee"); // Use useTranslations

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:px-4 px-1 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h1 className="text-4xl font-bold mb-4">{t("header.title")}</h1>
          <p className="text-xl max-w-6xl mx-auto">{t("header.subtitle")}</p>
        </header>

        <Accordion type="single" collapsible className="mb-12">
          {t.raw("guaranteePoints").map((point: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {index + 1}. {point.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {point.content.map((paragraph: any, pIndex: number) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {t("chooseUsPoints.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 md:grid-cols-2">
              {t
                .raw("chooseUsPoints.lists")
                .map((point: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            size="lg"
            variant="destructive"
            onClick={() => onOpen("quickQuote")}
          >
            {t("buttonText")}
          </Button>
        </div>
      </div>
    </div>
  );
}
