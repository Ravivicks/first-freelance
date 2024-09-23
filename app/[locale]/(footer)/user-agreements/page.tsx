"use client";
import { Check, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from "next-intl";

export default function UserAgreementPage() {
  const t = useTranslations("userAgreements");

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:px-4 px-1 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {t("header.title")}
          </h1>
          <p className="text-lg text-gray-600 max-w-6xl mx-auto">
            {t("header.description")}
          </p>
        </header>

        <Accordion type="single" collapsible className="mb-12">
          {t.raw("agreementPoints").map((point: any, index: number) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-gray-800">
                <span className="flex items-center gap-2">
                  <span>{index + 1}.</span> {point.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                {point.content
                  .split("\n\n")
                  .map((paragraph: any, pIndex: number) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                {point.list && (
                  <ul className="list-disc pl-5 space-y-2">
                    {point.list.map((item: any, iIndex: number) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="mb-12 custom-bg-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {t("chooseUsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {t.raw("chooseUsPoints").map((point: any, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
