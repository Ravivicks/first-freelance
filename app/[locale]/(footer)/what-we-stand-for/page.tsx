"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Shield, Award, Leaf, Users, Globe } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import Loader from "@/components/Loader";
const iconMapping: { [key: string]: React.ElementType } = {
  Lightbulb,
  Shield,
  Award,
  Leaf,
  Users,
  Globe,
};

export default function WhatWeStandFor() {
  const [activeTab, setActiveTab] = useState("innovation");
  const { locale } = useParams();
  useFetchStaticData(locale as string, "wwsf");
  const { data: staticData, isLoading } = useStaticDataStore();
  const { onOpen } = useCommonEnquiry();

  const coreValues = [
    {
      id: "innovation",
      icon: Lightbulb,
      title: "Innovation at the Core",
      description:
        "Driving advancements in Industry 4.0, IoT, and AI-powered solutions.",
      content:
        "In the fast-evolving world of industrial automation, innovation is not just a goal—it's a necessity. We stay on the cutting edge of Industry 4.0, IoT, AI-powered solutions, and advanced automation technologies. Our partnerships with leading brands like Siemens, DEIF, Schneider, and ComAp give us access to state-of-the-art products that integrate seamlessly into modern industrial setups.",
    },
    {
      id: "integrity",
      icon: Shield,
      title: "Integrity and Trust",
      description:
        "Conducting business ethically and transparently in all our interactions.",
      content:
        "We are dedicated to conducting business ethically and transparently, ensuring that every interaction is grounded in mutual trust. From providing honest, transparent pricing to delivering on promises of product quality and reliability, our clients can trust that they are working with a company that prioritizes fairness and honesty.",
    },
    {
      id: "excellence",
      icon: Award,
      title: "Excellence in Every Aspect",
      description:
        "Striving for the highest standards in products, services, and support.",
      content:
        "Excellence is more than a value at Automation eCom Global—it's a standard we live by. From the products we offer to the service we provide, we aim for excellence in every aspect of our business. We regularly invest in training for our staff to ensure that we remain experts in the latest automation technologies, so that our customers benefit from informed, insightful advice.",
    },
    {
      id: "sustainability",
      icon: Leaf,
      title: "Commitment to Sustainability",
      description:
        "Promoting environmentally responsible automation solutions.",
      content:
        "Our solutions are designed not only to optimize efficiency but also to minimize environmental impact. We actively promote products that enable businesses to reduce their carbon footprint. As part of our corporate mission, we contribute to various environmental and social causes, including education initiatives and animal welfare.",
    },
    {
      id: "customer",
      icon: Users,
      title: "Customer-Centric Approach",
      description: "Putting our customers first in everything we do.",
      content:
        "At Automation eCom Global, everything we do is geared toward delivering an exceptional customer experience. Our success is measured by the success of our clients. We take the time to understand each client's specific challenges and objectives, providing comprehensive support at every stage.",
    },
    {
      id: "global",
      icon: Globe,
      title: "Global Reach, Local Expertise",
      description: "Combining worldwide presence with localized knowledge.",
      content:
        "We serve customers across Dubai, USA, China, India, and Germany, providing them with the best automation solutions sourced from world-leading brands. Our teams are equipped to provide expert advice that takes into consideration the unique demands and regulatory requirements of each market.",
    },
  ];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 space-y-12 ">
        <section className="text-center space-y-4 custom-bg py-4 rounded-md">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text">
            {staticData
              ? staticData?.whatWeStandFor?.title
              : `What We Stand For`}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-3 md:px-0">
            {staticData
              ? staticData?.whatWeStandFor?.introText
              : `At Automation eCom Global, our core values and guiding principles
            shape everything we do. We believe in building a foundation based on
            innovation, integrity, excellence, and sustainability.`}
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-8">
          {staticData
            ? staticData?.whatWeStandFor?.coreValues.map((value: any) => {
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
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })
            : coreValues.map((value) => (
                <Card
                  key={value.id}
                  className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300"
                >
                  <CardHeader>
                    <value.icon className="w-12 h-12 text-destructive mb-4" />
                    <CardTitle>{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 space-y-8">
          <h2 className="text-3xl font-semibold text-center">
            {staticData
              ? staticData?.whatWeStandFor?.detailsSection?.title
              : `Our Values in Detail`}
          </h2>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full">
              {staticData
                ? staticData?.whatWeStandFor?.coreValues.map((value: any) => {
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
                        <span className="hidden md:inline">{value.title}</span>
                      </TabsTrigger>
                    );
                  })
                : coreValues.map((value) => (
                    <TabsTrigger
                      key={value.id}
                      value={value.id}
                      className="text-sm"
                    >
                      {/* <value.icon className="w-5 h-5 mr-2" /> */}
                      <span className="hidden md:inline">{value.title}</span>
                    </TabsTrigger>
                  ))}
            </TabsList>
            {staticData
              ? staticData?.whatWeStandFor?.coreValues.map((value: any) => {
                  const IconComponent = iconMapping[value.icon];
                  return (
                    <TabsContent
                      key={value.id}
                      value={value.id}
                      className="mt-6"
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            {IconComponent && (
                              <IconComponent className="w-6 h-6 mr-2 text-destructive" />
                            )}
                            {value.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{value.content}</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  );
                })
              : coreValues.map((value) => (
                  <TabsContent key={value.id} value={value.id} className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <value.icon className="w-6 h-6 mr-2 text-primary" />
                          {value.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{value.content}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
          </Tabs>
        </section>

        <section className="text-center space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-lg">
          <h2 className="text-3xl font-semibold">
            {staticData
              ? staticData?.whatWeStandFor?.detailsSection?.introText
              : `Experience Our Values in Action`}
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {staticData
              ? staticData?.whatWeStandFor?.detailsSection?.description
              : ` At Automation eCom Global, we stand for more than just automation
            products—we stand for excellence, integrity, innovation,
            sustainability, and above all, our customers. Experience the
            difference our values make in delivering exceptional automation
            solutions.`}
          </p>
          <Button
            size="lg"
            variant="destructive"
            onClick={() => onOpen("serviceQuote")}
          >
            {staticData
              ? staticData?.whatWeStandFor?.detailsSection?.contactButton
              : `Contact Us Today`}
          </Button>
        </section>
      </div>
    </div>
  );
}
