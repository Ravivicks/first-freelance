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
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

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
  useFetchStaticData(locale as string, "di");
  const { data: staticData } = useStaticDataStore();

  const activeFeatureData = staticData?.deliveryInfo?.features.find(
    (f: any) => f.id === activeFeature
  );

  const ActiveIcon = activeFeatureData
    ? iconMapping[activeFeatureData.icon]
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>
            {staticData
              ? staticData?.deliveryInfo?.title
              : `About Our Delivery Services`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {staticData
              ? staticData?.deliveryInfo?.aboutDeliveryServices
              : `At Automation eCom Global, we recognize that timely and reliable
            delivery is crucial to your business operations. Whether you're
            purchasing Siemens PLCs, DEIF engine controllers, Schneider HMIs, or
            other industrial automation products, we ensure that your orders
            reach you quickly, safely, and with complete transparency. Our
            Delivery Information services are designed to give you confidence
            and control over your shipments, with flexible options tailored to
            meet your specific needs.`}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Features List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Delivery Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {staticData &&
                staticData?.deliveryInfo?.features.map((feature: any) => {
                  const Icon = iconMapping[feature.icon]; // Get the icon dynamically
                  return (
                    <Button
                      key={feature.id}
                      variant={
                        activeFeature === feature.id ? "default" : "outline"
                      }
                      className="w-full justify-start"
                      onClick={() => setActiveFeature(feature.id)}
                    >
                      {Icon && <Icon className="h-4 w-4 mr-2" />}{" "}
                      {/* Render the icon */}
                      <span className="ml-2">{feature.title}</span>
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
            <CardTitle className="flex items-center">
              {ActiveIcon && <ActiveIcon className="h-5 w-5 mr-2" />}{" "}
              {/* Icon before title */}
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
          <CardTitle>
            {staticData
              ? staticData?.deliveryInfo?.whyChooseTitle
              : `Why Choose Automation eCom Global for Your Delivery Needs?`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {staticData &&
              staticData?.deliveryInfo?.features?.map(
                (feature: any, index: number) => (
                  <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger>{feature.title}</AccordionTrigger>
                    <AccordionContent>{feature.description}</AccordionContent>
                  </AccordionItem>
                )
              )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
