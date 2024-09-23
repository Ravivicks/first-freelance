"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Power, CloudLightning } from "lucide-react";
import { useParams } from "next/navigation";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useTranslations } from "next-intl";

const iconMapping: { [key: string]: React.ElementType } = {
  Cpu,
  Zap,
  Power,
  CloudLightning,
};

export default function PartnerBrands() {
  const [activeTab, setActiveTab] = useState("siemens");
  const { locale } = useParams();
  const t = useTranslations("partnerBrands");
  const { onOpen } = useCommonEnquiry();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto md:px-4 px-1 py-8 space-y-8 max-w-6xl">
        <section className="text-center space-y-4 custom-bg py-4 rounded-md">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("intro")}
          </p>
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg md:p-8 space-y-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-8">
              {t.raw("partners").map((partner: any) => {
                const IconComponent = iconMapping[partner.icon];
                return (
                  <TabsTrigger
                    key={partner.id}
                    value={partner.id}
                    className="text-sm"
                  >
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 mr-2" />
                    )}
                    <span>{partner.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {t.raw("partners").map((partner: any) => {
              const IconComponent = iconMapping[partner.icon];
              return (
                <TabsContent
                  key={partner.id}
                  value={partner.id}
                  className="mt-6"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex md:items-center md:justify-between flex-col gap-6 md:flex-row">
                        <CardTitle className="flex items-center text-3xl">
                          {IconComponent && (
                            <IconComponent className="w-8 h-8 mr-3 text-destructive" />
                          )}
                          {partner.name}
                        </CardTitle>
                        <Badge variant="secondary" className="text-sm">
                          {partner.tagline}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-muted-foreground">
                        {partner.description}
                      </p>
                      <div>
                        <h3 className="font-semibold mb-2">Key Products:</h3>
                        <div className="flex flex-wrap gap-2">
                          {partner.products.map(
                            (product: any, index: number) => (
                              <Badge key={index} variant="outline">
                                {product}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                      <p>{partner.content}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center bg-card/50 backdrop-blur-sm rounded-lg md:p-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("advantage.title")}</h2>
            <p className="text-muted-foreground">
              {t("advantage.description")}
            </p>
            <ul className="space-y-2">
              {t.raw("advantage.points").map((point: string, index: number) => (
                <li key={index} className="flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-destructive" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-semibold">{t("cta.title")}</h3>
            <p className="text-muted-foreground">{t("cta.description")}</p>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => onOpen("serviceQuote")}
            >
              {t("cta.buttonText")}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
