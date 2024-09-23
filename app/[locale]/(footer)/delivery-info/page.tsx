"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Truck,
  Clock,
  Package,
  Bell,
  FileText,
  MapPin,
  RefreshCw,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";

const iconMapping: { [key: string]: LucideIcon } = {
  Globe,
  Truck,
  Clock,
  Package,
  Bell,
  FileText,
  MapPin,
  RefreshCw,
  // Add more icons here if needed
};

export default function DeliveryInformation() {
  const [activeFeature, setActiveFeature] = useState("1");

  const { locale } = useParams();
  const t = useTranslations("deliveryInfo");

  const features = t.raw("features");
  const activeFeatureData = features.find((f: any) => f.id === activeFeature);
  const ActiveIcon = activeFeatureData
    ? iconMapping[activeFeatureData.icon]
    : null;

  return (
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t("aboutDeliveryServices")}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 grid-cols-1 gap-8">
        {/* Features List */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>{t("featuresTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {features.map((feature: any) => {
                const Icon = iconMapping[feature.icon]; // Get the icon dynamically
                return (
                  <Button
                    key={feature.id}
                    variant={
                      activeFeature === feature.id ? "destructive" : "outline"
                    }
                    className="w-full justify-start font-semibold"
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    {Icon && (
                      <Icon className="h-4 w-4 hidden md:inline md:mr-2" />
                    )}
                    <span className="ml-2 text-wrap">{feature.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feature Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex md:items-center flex-col md:flex-row">
              {ActiveIcon && (
                <ActiveIcon className="md:h-5 md:w-5 md:mr-2 w-10 h-10 mb-3 md:mb-0 text-destructive" />
              )}
              {activeFeatureData?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{activeFeatureData?.description}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t("whyChooseTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {t.raw("whyChooseUs").map((item: any, index: number) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
