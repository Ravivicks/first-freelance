"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Power, CloudLightning } from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import Loader from "@/components/Loader";

const iconMapping: { [key: string]: React.ElementType } = {
  Cpu,
  Zap,
  Power,
  CloudLightning,
};

export default function PartnerBrands() {
  const [activeTab, setActiveTab] = useState("siemens");
  const { locale } = useParams();
  useFetchStaticData(locale as string, "pb");
  const { data: staticData, isLoading } = useStaticDataStore();
  const { onOpen } = useCommonEnquiry();

  const partners = [
    {
      id: "siemens",
      icon: Cpu,
      name: "Siemens",
      tagline: "German Engineering Excellence",
      description:
        "World-leading industrial automation company known for reliability, precision, and technological advancement.",
      products: [
        "S7-1200 PLCs",
        "S7-1500 PLCs",
        "LOGO! PLC",
        "HMIs",
        "Drives",
        "Power Supplies",
      ],
      content:
        "As one of the world's leading industrial automation companies, Siemens is synonymous with reliability, precision, and technological advancement. Our partnership with Siemens allows us to offer their entire range of PLC, HMI, drives, power supplies, and control systems. Siemens' products are known for their German engineering excellence, providing unparalleled performance and reliability in even the most demanding industrial environments. We offer best market discounts on Siemens German-made products, ensuring that our customers get the highest quality equipment at the most competitive prices.",
    },
    {
      id: "deif",
      icon: Zap,
      name: "DEIF",
      tagline: "Engine Control Expertise",
      description:
        "Danish manufacturer of advanced engine control solutions for diesel, turbine, and hybrid engines.",
      products: [
        "AGC-4 series",
        "Advanced Genset Controllers",
        "Marine Controllers",
        "Power Management Systems",
      ],
      content:
        "Based in Denmark, DEIF is a leading manufacturer of advanced engine control solutions, particularly known for its expertise in diesel, turbine, and hybrid engine controllers. DEIF controllers are trusted by major global engine manufacturers, including Cummins, due to their durability, precision, and exceptional performance in critical applications. At Automation eCom Global, we supply a comprehensive range of DEIF products that cater to the needs of various industries, from power generation to marine and off-shore sectors. DEIF's solutions are renowned for their reliability in extreme conditions, offering IP65-rated protection and long-term performance even in the harshest environments.",
    },
    {
      id: "schneider",
      icon: CloudLightning,
      name: "Schneider",
      tagline: "Global Leaders in Energy and Automation",
      description:
        "Renowned for energy management and automation solutions enabling efficient and sustainable industrial operations.",
      products: [
        "PLCs",
        "HMIs",
        "SCADA Systems",
        "Energy Management Solutions",
        "Industrial IoT Platforms",
      ],
      content:
        "Schneider Electric is another key partner of Automation eCom Global, known for its energy management and automation solutions that enable industries to operate more efficiently and sustainably. Schneider's range of products, including PLCs, HMIs, and SCADA systems, provides comprehensive control and automation capabilities for various industries, from manufacturing to infrastructure development. At Automation eCom Global, we offer Schneider's advanced automation systems designed for modern smart factories, integrating AI and IoT technologies for predictive maintenance, real-time data analysis, and remote monitoring.",
    },
    {
      id: "comap",
      icon: Power,
      name: "ComAp",
      tagline: "Precision in Engine Control",
      description:
        "Czech Republic-based industry leader in engine controllers for power generation and industrial applications.",
      products: [
        "Diesel Generator Controllers",
        "Turbine Controllers",
        "Hybrid Power System Controllers",
        "Remote Monitoring Solutions",
      ],
      content:
        "Based in the Czech Republic, ComAp is an industry leader in engine controllers, known for delivering high-performance solutions for a wide range of power generation and industrial applications. ComAp controllers are trusted for their advanced synchronization, load-sharing, and control capabilities, making them ideal for businesses that rely on precise and dependable control systems. Automation eCom Global offers a range of ComAp products, including controllers for diesel generators, turbines, and hybrid power systems, ensuring that our customers have the tools they need to maintain continuous, uninterrupted operations.",
    },
  ];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-4 custom-bg py-4 rounded-md">
          <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text">
            {staticData
              ? staticData?.partnerBrands?.title
              : `Our Partner Brands`}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {staticData
              ? staticData?.partnerBrands?.intro
              : `At Automation eCom Global, our strength lies in our strategic
            partnerships with some of the most renowned and innovative brands in
            the world of industrial automation.`}
          </p>
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg p-8 space-y-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 w-full mb-8">
              {staticData
                ? staticData?.partnerBrands?.partners?.map(
                    (partner: any, index: number) => {
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
                    }
                  )
                : partners.map((partner) => (
                    <TabsTrigger
                      key={partner.id}
                      value={partner.id}
                      className="text-sm"
                    >
                      <partner.icon className="w-5 h-5 mr-2" />
                      <span>{partner.name}</span>
                    </TabsTrigger>
                  ))}
            </TabsList>
            {staticData
              ? staticData?.partnerBrands?.partners?.map(
                  (partner: any, index: number) => {
                    const IconComponent = iconMapping[partner.icon];
                    return (
                      <TabsContent
                        key={partner.id}
                        value={partner.id}
                        className="mt-6"
                      >
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
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
                              <h3 className="font-semibold mb-2">
                                Key Products:
                              </h3>
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
                  }
                )
              : partners.map((partner) => (
                  <TabsContent
                    key={partner.id}
                    value={partner.id}
                    className="mt-6"
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center text-3xl">
                            <partner.icon className="w-8 h-8 mr-3 text-primary" />
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
                            {partner.products.map((product, index) => (
                              <Badge key={index} variant="outline">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <p>{partner.content}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
          </Tabs>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center bg-card/50 backdrop-blur-sm rounded-lg p-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">
              {staticData
                ? staticData?.partnerBrands?.advantage?.title
                : `The Automation eCom Global Advantage`}
            </h2>
            <p className="text-muted-foreground">
              {staticData
                ? staticData?.partnerBrands?.advantage?.description
                : ` What sets us apart is our ability to provide world-class
              automation solutions backed by strong relationships with these
              leading brands. We offer unparalleled access to high-quality
              products, along with the technical expertise and customer support
              that ensures our clients can maximize the value of their
              automation investments.`}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Cpu className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.partnerBrands?.advantage?.points?.[0]
                  : `Best-in-market pricing`}
              </li>
              <li className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.partnerBrands?.advantage?.points?.[1]
                  : `Comprehensive product range`}
              </li>
              <li className="flex items-center">
                <CloudLightning className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.partnerBrands?.advantage?.points?.[2]
                  : `Tailored solutions`}
              </li>
              <li className="flex items-center">
                <Power className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.partnerBrands?.advantage?.points?.[3]
                  : `Unmatched customer support`}
              </li>
            </ul>
          </div>
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-semibold">
              {staticData
                ? staticData?.partnerBrands?.cta?.title
                : `Ready to Elevate Your Automation?`}
            </h3>
            <p className="text-muted-foreground">
              {staticData
                ? staticData?.partnerBrands?.cta?.description
                : `Gain access to the latest technologies from the world's leading
              automation brands, along with personalized service and support.`}
            </p>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => onOpen("serviceQuote")}
            >
              {staticData
                ? staticData?.partnerBrands?.cta?.buttonText
                : `Contact Us Today`}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
