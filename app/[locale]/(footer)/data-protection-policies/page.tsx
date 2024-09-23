"use client";
import { Shield, Lock, Globe, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import Loader from "@/components/Loader";

const iconMapping: { [key: string]: React.ElementType } = {
  Lock,
  Globe,
  Database,
  UserCheck,
};

export default function DataProtectionPolicyPage() {
  const { locale } = useParams();
  const t = useTranslations("dataProtectionPolicies");
  const { onOpen } = useCommonEnquiry();
  // Assuming some loading logic
  const isLoading = false;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:px-4 px-1 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <Shield className="w-20 h-20 mx-auto mb-6 text-destructive" />
          <h1 className="text-4xl font-bold mb-4">{t("header.title")}</h1>
          <p className="text-xl max-w-6xl mx-auto">{t("header.description")}</p>
        </header>

        <Tabs defaultValue="privacy" className="mb-12">
          <TabsList className="grid w-full grid-cols-1 lg:grid-cols-4 mb-8">
            {t.raw("policyPoints").map((point: any, index: number) => {
              const IconComponent = iconMapping[point.icon];
              return (
                <TabsTrigger
                  key={index}
                  value={point.tab}
                  className="flex items-center gap-2"
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                  <span>{point.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {t.raw("policyPoints").map((point: any, index: number) => {
            const IconComponent = iconMapping[point.icon];
            return (
              <TabsContent key={index} value={point.tab}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex md:items-center flex-col md:flex-row gap-2 text-2xl">
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-destructive self-start" />
                      )}
                      <span>{point.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {point.content
                        .split("\n\n")
                        .map((paragraph: string, pIndex: number) => (
                          <p key={pIndex} className="mb-4 text-gray-700">
                            {paragraph}
                          </p>
                        ))}
                      {point.list && (
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                          {point.list.map((item: any, iIndex: number) => (
                            <li key={iIndex}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        <Card className="mb-12 custom-bg-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {t("whyChooseUs.title")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 md:grid-cols-2">
              {t.raw("chooseUsPoints").map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
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
            {t("whyChooseUs.callToAction")}
          </Button>
        </div>
      </div>
    </div>
  );
}
