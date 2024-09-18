"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Wrench,
  PhoneCall,
  Globe,
  Package,
  ShieldCheck,
  MessageSquare,
  FileText,
  Settings,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import Loader from "@/components/Loader";

export default function HelpAndSupport() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const { locale } = useParams();
  useFetchStaticData(locale as string, "has");
  const { data: staticData, isLoading } = useStaticDataStore();

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Wrench":
        return <Wrench className="w-8 h-8 mr-3 text-primary" />;
      case "PhoneCall":
        return <PhoneCall className="w-8 h-8 mr-3 text-primary" />;
      case "Globe":
        return <Globe className="w-8 h-8 mr-3 text-primary" />;
      case "Settings":
        return <Settings className="w-8 h-8 mr-3 text-primary" />;
      case "FileText":
        return <FileText className="w-8 h-8 mr-3 text-primary" />;
      case "Package":
        return <Package className="w-8 h-8 mr-3 text-primary" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-8 h-8 mr-3 text-primary" />;
      case "MessageSquare":
        return <MessageSquare className="w-8 h-8 mr-3 text-primary" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-16">
        <section className="text-center custom-bg py-4 space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text">
            {staticData?.helpAndSupport?.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {staticData?.helpAndSupport?.subtitle}
          </p>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            {staticData?.helpAndSupport?.supportServicesTitle}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {staticData?.helpAndSupport?.services?.map((service: any) => (
              <Card
                key={service.id}
                className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    {getIconComponent(service.icon)}
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.shortDesc}</p>
                  {expandedService === service.id ? (
                    <div className="mt-4">
                      <p>{service.content}</p>
                      <Button
                        variant="link"
                        onClick={() => setExpandedService(null)}
                        className="mt-2 p-0"
                      >
                        Read Less
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="link"
                      onClick={() => setExpandedService(service.id)}
                      className="mt-2 p-0"
                    >
                      Read More
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            {staticData?.helpAndSupport?.whyChooseTitle}
          </h2>
          <ul className="list-disc list-inside space-y-2 text-center">
            {staticData?.helpAndSupport?.whyChooseItems?.map(
              (item: any, index: number) => (
                <li key={index} className="text-lg">
                  {item}
                </li>
              )
            )}
          </ul>
        </section>

        <section className="space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            {staticData?.helpAndSupport?.faqTitle}
          </h2>
          <Accordion type="single" collapsible>
            {staticData?.helpAndSupport?.faqs.map((faq: any, index: number) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">
            {staticData?.helpAndSupport?.assistanceTitle}
          </h2>
          <p className="text-lg text-muted-foreground mb-4">
            {staticData?.helpAndSupport?.assistanceDescription}
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">
              {staticData?.helpAndSupport?.contactSupportButton}
            </Button>
            <Button variant="secondary">
              {staticData?.helpAndSupport?.viewKnowledgeBaseButton}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
