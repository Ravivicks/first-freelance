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
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import Loader from "@/components/Loader";

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
  const [activeTab, setActiveTab] = useState("global-leader");
  const { locale } = useParams();
  useFetchStaticData(locale as string, "cao");
  const { data: staticData, isLoading, error } = useStaticDataStore();

  const careerAspects = [
    {
      id: "global-leader",
      icon: Globe,
      title: "Be Part of a Global Leader",
      content:
        "Work with cutting-edge technologies and global brands like Siemens, Schneider, DEIF, and ComAp. Our operations span Dubai, USA, China, India, and Germany, offering diverse project opportunities across multiple industries and regions.",
    },
    {
      id: "growth",
      icon: TrendingUp,
      title: "Grow with Us",
      content:
        "Access a range of training programs, mentorship opportunities, and on-the-job learning experiences. Stay ahead with emerging technologies like Industry 4.0, AI, and IoT-based automation systems.",
    },
    {
      id: "work-environment",
      icon: Users,
      title: "Dynamic Work Environment",
      content:
        "Join a diverse, inclusive workplace where innovation thrives and every voice is heard. Collaborate with global teams and bring fresh ideas to solve complex challenges in industrial automation.",
    },
    {
      id: "roles",
      icon: Briefcase,
      title: "Exciting Roles",
      content:
        "Explore opportunities in Engineering, Sales, Customer Support, Product Management, and Supply Chain. Every position is crucial to our success in the industrial automation market.",
    },
    {
      id: "work-life-balance",
      icon: HeartHandshake,
      title: "Work-Life Balance",
      content:
        "Enjoy flexible working arrangements, paid time off, and health benefits. We're committed to supporting your well-being and productivity.",
    },
    {
      id: "sustainability",
      icon: Leaf,
      title: "Contribute to a Sustainable Future",
      content:
        "Be part of projects that reduce energy consumption, optimize resource use, and minimize environmental impact. Contribute to positive change both in and out of the workplace.",
    },
  ];

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:px-4 px-1 py-8 space-y-16 max-w-6xl">
        <section className="text-center space-y-4 custom-bg py-4 rounded-md">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text">
            {staticData
              ? staticData?.careersAndOpportunities?.heading
              : "Careers and Opportunities"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-3 md:px-0">
            {staticData
              ? staticData?.careersAndOpportunities?.intro
              : `Join Automation eCom Global and be part of a team driving innovation
            in industrial automation across the globe.`}
          </p>
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg space-y-8">
          <h2 className="text-3xl font-semibold text-center mb-8">
            {staticData
              ? staticData?.careersAndOpportunities?.joinUs?.whyJoinUs?.title
              : "Why Join Us?"}
          </h2>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-1 lg:grid-cols-3 w-full mb-8">
              {staticData
                ? staticData?.careersAndOpportunities?.whyJoinUs?.careerAspects?.map(
                    (aspect: any) => {
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
                    }
                  )
                : careerAspects.map((aspect) => (
                    <TabsTrigger
                      key={aspect.id}
                      value={aspect.id}
                      className="text-sm"
                    >
                      <span>{aspect.title}</span>
                    </TabsTrigger>
                  ))}
            </TabsList>
            {staticData
              ? staticData?.careersAndOpportunities?.whyJoinUs?.careerAspects?.map(
                  (aspect: any) => {
                    const IconComponent = iconMapping[aspect.icon];
                    return (
                      <TabsContent
                        key={aspect.id}
                        value={aspect.id}
                        className="mt-6"
                      >
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center text-2xl">
                              {IconComponent && (
                                <IconComponent className="w-8 h-8 mr-3 text-destructive" />
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
                  }
                )
              : careerAspects.map((aspect: any) => (
                  <TabsContent
                    key={aspect.id}
                    value={aspect.id}
                    className="mt-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center text-2xl">
                          <aspect.icon className="w-8 h-8 mr-3 text-primary" />
                          {aspect.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{aspect.content}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
          </Tabs>
        </section>

        <section className="bg-card/50 backdrop-blur-sm rounded-lg md:p-8 space-y-8">
          <h2 className="text-3xl font-semibold text-center">
            {staticData
              ? staticData?.careersAndOpportunities?.excitingRoles?.title
              : " Exciting Roles Across Multiple Functions"}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {staticData
              ? staticData?.careersAndOpportunities?.excitingRoles?.roles.map(
                  (role: any, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-lg py-2 px-4 text-center"
                    >
                      {role}
                    </Badge>
                  )
                )
              : roles.map((role: any, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-lg py-2 px-4"
                  >
                    {role}
                  </Badge>
                ))}
          </div>
          <p className="text-center text-muted-foreground">
            {staticData
              ? staticData?.careersAndOpportunities?.excitingRoles?.description
              : `Whether your passion lies in technical innovation, sales strategy,
            or customer service, we offer roles that match your skills and
            aspirations.`}
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center bg-card/50 backdrop-blur-sm rounded-lg md:p-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">
              {staticData
                ? staticData?.careersAndOpportunities?.joinUs?.title
                : "Join Us on Our Journey"}
            </h2>
            <p className="text-muted-foreground">
              {staticData
                ? staticData?.careersAndOpportunities?.joinUs?.content
                : `At Automation eCom Global, we are not just building automation
              solutions; we are building a future where industries are more
              efficient, sustainable, and innovative. We invite passionate,
              driven individuals to join us on this journey and be part of
              something greater.`}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.careersAndOpportunities?.joinUs?.benefits?.[0]
                      ?.text
                  : "Work with cutting-edge technology"}
              </li>
              <li className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.careersAndOpportunities?.joinUs?.benefits?.[1]
                      ?.text
                  : `Contribute to industry-leading projects`}
              </li>
              <li className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.careersAndOpportunities?.joinUs?.benefits?.[2]
                      ?.text
                  : `Grow alongside bright minds in automation`}
              </li>
              <li className="flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-destructive" />
                {staticData
                  ? staticData?.careersAndOpportunities?.joinUs?.benefits?.[3]
                      ?.text
                  : `Make a positive impact on the environment`}
              </li>
            </ul>
          </div>
          <div className="space-y-6 text-center">
            <h3 className="text-2xl font-semibold">
              {staticData
                ? staticData?.careersAndOpportunities?.joinUs?.callToAction
                    ?.title
                : `Ready to Start Your Journey?`}
            </h3>
            <p className="text-muted-foreground">
              {staticData
                ? staticData?.careersAndOpportunities?.joinUs?.callToAction
                    ?.description
                : `Explore our current openings and take the first step towards an
              exciting career in industrial automation.`}
            </p>
            <Button variant="destructive" size="lg">
              {staticData
                ? staticData?.careersAndOpportunities?.joinUs?.callToAction
                    ?.buttonText
                : `View Open Positions`}
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
