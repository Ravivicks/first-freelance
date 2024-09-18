"use client";
import { Shield, Lock, Globe, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
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
  useFetchStaticData(locale as string, "dpp");
  const { data: staticData, isLoading, error } = useStaticDataStore();
  const { onOpen } = useCommonEnquiry();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <Shield className="w-20 h-20 mx-auto mb-6 text-destructive" />
          <h1 className="text-4xl font-bold mb-4">
            {staticData
              ? staticData?.dataProtectionPolicies?.header?.title
              : `Data Protection and Policy`}
          </h1>
          <p className="text-xl max-w-6xl mx-auto">
            {staticData
              ? staticData?.dataProtectionPolicies?.header?.description
              : `At Automation eCom Global, we prioritize the security and privacy of
            our customers' personal and business data. In an increasingly
            digital world, safeguarding your sensitive information is critical,
            and we are committed to ensuring that your data is always protected
            when you interact with our platform. Our Data Protection Policies
            are designed to comply with the highest global standards, including
            the General Data Protection Regulation (GDPR) and other
            international privacy regulations. We ensure that your data is
            handled with transparency, responsibility, and integrity at every
            step of the process.`}
          </p>
        </header>

        <Tabs defaultValue="privacy" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {staticData ? (
              staticData?.dataProtectionPolicies?.policyPoints?.map(
                (point: any, index: number) => {
                  const IconComponent = iconMapping[point.icon]; // Get the appropriate icon
                  return (
                    <TabsTrigger
                      key={index}
                      value={point.tab}
                      className="flex items-center gap-2"
                    >
                      {/* Render the icon in the tab if it exists */}
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      <span>{point.title}</span>
                    </TabsTrigger>
                  );
                }
              )
            ) : (
              <>
                <TabsTrigger
                  value="privacy"
                  className="flex items-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  <span>Privacy Commitment</span>
                </TabsTrigger>
                <TabsTrigger
                  value="compliance"
                  className="flex items-center gap-2"
                >
                  <Globe className="w-5 h-5" />
                  <span>GDPR Compliance</span>
                </TabsTrigger>
                <TabsTrigger
                  value="data-usage"
                  className="flex items-center gap-2"
                >
                  <Database className="w-5 h-5" />
                  <span>Data Usage</span>
                </TabsTrigger>
                <TabsTrigger
                  value="your-rights"
                  className="flex items-center gap-2"
                >
                  <UserCheck className="w-5 h-5" />
                  <span>Your Rights</span>
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {staticData
            ? staticData?.dataProtectionPolicies?.policyPoints?.map(
                (point: any, index: number) => {
                  const IconComponent = iconMapping[point.icon]; // Get the appropriate icon
                  return (
                    <TabsContent key={index} value={point.tab}>
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-2xl">
                            {/* Render the icon in the content if it exists */}
                            {IconComponent && (
                              <IconComponent className="w-8 h-8" />
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
                }
              )
            : policyPoints.map((point: any, index: number) => {
                const IconComponent = iconMapping[point.icon]; // Get the appropriate icon
                return (
                  <TabsContent key={index} value={point.tab}>
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                          {IconComponent && (
                            <IconComponent className="w-8 h-8" />
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
              {staticData
                ? staticData?.dataProtectionPolicies?.whyChooseUs?.title
                : `Why Choose Automation eCom Global for Data Protection?`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 md:grid-cols-2">
              {staticData
                ? staticData?.dataProtectionPolicies?.chooseUsPoints.map(
                    (point: any, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    )
                  )
                : chooseUsPoints.map((point, index) => (
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
            {staticData
              ? staticData?.dataProtectionPolicies?.whyChooseUs?.callToAction
              : `Contact Us for More Information`}
          </Button>
        </div>
      </div>
    </div>
  );
}

const policyPoints = [
  {
    icon: Lock,
    title: "Commitment to Privacy and Data Security",
    tab: "privacy",
    content:
      "We take your privacy seriously and are committed to protecting your personal and business information from unauthorized access, use, or disclosure. When you interact with Automation eCom Global, whether through purchasing industrial automation products like Siemens PLCs or browsing our website, you can trust that your data is stored securely and used only for the purposes for which it was intended.\n\nOur data protection measures include:",
    list: [
      "Encryption: All sensitive information, including payment details and personal data, is encrypted using SSL (Secure Socket Layer) technology, ensuring that your data is protected during transmission.",
      "Access controls: We implement strict access controls to ensure that only authorized personnel have access to your data.",
      "Regular audits: Our systems are regularly audited and monitored for security vulnerabilities, and we continuously update our processes to align with the latest data protection standards.",
    ],
  },
  {
    icon: Globe,
    title: "Compliance with GDPR and Global Privacy Laws",
    tab: "compliance",
    content:
      "As a global company serving customers in regions like Europe, USA, India, China, Dubai, and Germany, Automation eCom Global adheres to various international privacy laws, including GDPR for our European customers. Our policies are designed to provide you with full control over your personal data, ensuring that it is processed lawfully, fairly, and transparently.\n\nOur commitment to GDPR compliance includes:",
    list: [
      "Data collection transparency: We clearly inform you about what data we collect, why we collect it, and how we use it.",
      "Right to access: You have the right to request access to the personal data we hold about you, and we will provide you with a copy of the information in a timely manner.",
      "Right to rectification: If you believe any of the data we hold about you is inaccurate, you have the right to request that we correct it.",
      "Right to erasure: You can request that we delete your personal data from our systems if it is no longer necessary for the purpose for which it was collected, or if you withdraw your consent.",
    ],
  },
  {
    icon: Database,
    title: "How We Collect and Use Data",
    tab: "data-usage",
    content:
      "At Automation eCom Global, we collect and use data for specific, legitimate business purposes. The data we collect helps us provide better services, improve our platform, and ensure that you have a smooth and personalized shopping experience.\n\nWe collect data in the following ways:",
    list: [
      "Personal Information: When you create an account, make a purchase, or contact us, we collect personal information such as your name, email address, shipping address, and payment details. This information is used to fulfill your orders, provide customer support, and keep you informed about the status of your transactions.",
      "Website Usage Data: We collect non-personal data such as your IP address, browser type, and website usage patterns to help us improve the performance of our platform and provide a better user experience. This data is anonymized and used for analytical purposes only.",
      "Cookies: We use cookies to enhance your browsing experience by remembering your preferences and login details. You can control the use of cookies through your browser settings and choose to accept or decline them.",
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights and Choices",
    tab: "your-rights",
    content:
      "At Automation eCom Global, we believe in empowering our customers to take control of their personal data. As part of our Data Protection Policies, we provide you with a range of rights and choices regarding how your data is collected, used, and shared.\n\nYour rights include:",
    list: [
      "Access to your data: You can request a copy of the personal information we hold about you at any time.",
      "Correction of your data: If any of your personal information is incorrect or incomplete, you can request that we update it.",
      "Deletion of your data: You can request the deletion of your personal data, and we will comply as long as there is no legal requirement to retain it.",
      'Opting out of communications: You can opt out of marketing emails or other communications at any time by adjusting your preferences in your account settings or using the "unsubscribe" link in our emails.',
    ],
  },
];

const chooseUsPoints = [
  "Compliance with global privacy laws: We adhere to GDPR and other international data protection standards to ensure your data is always handled securely.",
  "Transparent data usage: We provide clear information on how your data is collected, used, and stored, giving you full control over your personal information.",
  "Advanced security measures: Your data is protected with SSL encryption, secure servers, and strict access controls.",
  "Respect for your privacy: We never sell or share your data without your consent, and we work with trusted third parties to provide essential services.",
  "User rights and control: You can access, correct, or delete your data at any time, and manage your communication preferences with ease.",
];
