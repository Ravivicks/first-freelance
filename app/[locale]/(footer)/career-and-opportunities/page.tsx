"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Briefcase,
  HeartHandshake,
  Leaf,
  Rocket,
  Globe,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";
import { useSupportOpen } from "@/hooks/use-support-open";

const iconMapping: { [key: string]: React.ElementType } = {
  TrendingUp,
  Users,
  Briefcase,
  HeartHandshake,
  Leaf,
  Rocket,
  Globe,
};

export default function CareersAndOpportunities() {
  const t = useTranslations("careersAndOpportunities");
  const [activeTab, setActiveTab] = useState("global-leader");
  const { onOpen } = useSupportOpen();

  const roles = [
    "Engineering",
    "Sales and Business Development",
    "Customer Support",
    "Technical Assistance",
    "Product Management",
    "Marketing",
    "Supply Chain",
    "Operations",
  ];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:px-4 px-1 py-8 space-y-16 max-w-6xl">
        <section className="text-center space-y-4 custom-bg py-4 rounded-md">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text">
            {t("heading")}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-3 md:px-0">
            {t("intro")}
          </p>
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            {t("whyJoinUs.title")}
          </h2>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-1 lg:grid-cols-3 w-full mb-8">
              {t.raw("whyJoinUs.careerAspects").map((aspect: any) => {
                const IconComponent = iconMapping[aspect.icon];
                return (
                  <TabsTrigger
                    key={aspect.id}
                    value={aspect.id}
                    className="text-sm"
                  >
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 mr-2" />
                    )}
                    <span>{aspect.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {t.raw("whyJoinUs.careerAspects").map((aspect: any) => {
              const IconComponent = iconMapping[aspect.icon];
              return (
                <TabsContent key={aspect.id} value={aspect.id} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex md:items-center flex-col md:flex-row text-2xl">
                        {IconComponent && (
                          <IconComponent className="w-8 h-8 mr-3 text-destructive self-start" />
                        )}
                        {aspect.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{aspect.content}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg md:p-8 space-y-8">
          <h2 className="text-3xl font-semibold text-center">
            {t("excitingRoles.title")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {t.raw("excitingRoles.roles").map((role: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-lg py-2 px-4 text-center"
              >
                {role}
              </Badge>
            ))}
          </div>
          <p className="text-center text-muted-foreground">
            {t("excitingRoles.description")}
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center bg-card/50 backdrop-blur-sm rounded-lg md:p-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">{t("joinUs.title")}</h2>
            <p className="text-muted-foreground">{t("joinUs.content")}</p>
            <ul className="space-y-2">
              {t.raw("joinUs.benefits").map((benefit: any, index: number) => {
                const IconComponent = iconMapping[benefit.icon];
                return (
                  <li key={index} className="flex items-center">
                    {IconComponent && (
                      <IconComponent className="w-5 h-5 mr-2 text-destructive" />
                    )}
                    {benefit.text}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-semibold">
              {t("joinUs.callToAction.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("joinUs.callToAction.description")}
            </p>
            <Button variant="destructive" size="lg" onClick={onOpen}>
              {t("joinUs.callToAction.buttonText")}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
