"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Shield, Award, Leaf, Users, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";

const iconMapping: { [key: string]: React.ElementType } = {
  Lightbulb,
  Shield,
  Award,
  Leaf,
  Users,
  Globe,
};

export default function WhatWeStandFor() {
  const t = useTranslations("whatWeStandFor");
  const [activeTab, setActiveTab] = useState("innovation");
  const { onOpen } = useCommonEnquiry();

  const coreValues = t.raw("coreValues");
  const detailsSection = t.raw("detailsSection");

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-1 py-8 space-y-12 max-w-6xl">
        <section className="text-center space-y-4 custom-bg py-4 rounded-md">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text">
            {t("title")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-3 md:px-0">
            {t("introText")}
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          {coreValues.map((value: any) => {
            const IconComponent = iconMapping[value.icon];
            return (
              <Card
                key={value.id}
                className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <CardHeader>
                  {IconComponent && (
                    <IconComponent className="w-12 h-12 text-destructive mb-4" />
                  )}
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg md:p-8 space-y-8">
          <h2 className="text-3xl font-semibold text-center">
            {detailsSection.title}
          </h2>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-1 lg:grid-cols-3 w-full">
              {coreValues.map((value: any) => {
                const IconComponent = iconMapping[value.icon];
                return (
                  <TabsTrigger
                    key={value.id}
                    value={value.id}
                    className="text-sm"
                  >
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 mr-2" />
                    )}
                    <span>{value.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {coreValues.map((value: any) => {
              const IconComponent = iconMapping[value.icon];
              return (
                <TabsContent key={value.id} value={value.id} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex md:items-center flex-col md:flex-row">
                        {IconComponent && (
                          <IconComponent className="md:w-6 w-10 h-10 md:h-6 self-start mb-3 md:mb-0 md:mr-2 text-destructive" />
                        )}
                        <p>{value.title}</p>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{value.content}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        <section className="text-center space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-lg">
          <h2 className="text-3xl font-semibold">{detailsSection.introText}</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {detailsSection.description}
          </p>
          <Button
            size="lg"
            variant="destructive"
            onClick={() => onOpen("serviceQuote")}
          >
            {detailsSection.contactButton}
          </Button>
        </section>
      </div>
    </div>
  );
}
