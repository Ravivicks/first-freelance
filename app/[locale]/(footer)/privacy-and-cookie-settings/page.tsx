import {
  Shield,
  Cookie,
  Lock,
  RefreshCw,
  UserCheck,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PrivacyCookieSettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="text-center mb-12">
          <Shield className="w-20 h-20 mx-auto mb-6 text-destructive" />
          <h1 className="text-5xl font-bold mb-4">Privacy & Cookie Settings</h1>
          <p className="text-xl max-w-5xl mx-auto">
            At Automation eCom Global, we prioritize your privacy and are
            committed to ensuring that your personal data is handled responsibly
            and securely. Our Privacy & Cookie Settings allow you to control how
            your information is collected, stored, and used while you navigate
            our website. We strive to provide you with full transparency
            regarding our data collection practices and give you the tools to
            manage your privacy preferences, including the use of cookies and
            other tracking technologies.
          </p>
        </header>

        <Tabs defaultValue="privacy" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="cookies">Cookie Policy</TabsTrigger>
            <TabsTrigger value="preferences">Cookie Preferences</TabsTrigger>
            <TabsTrigger value="updates">Policy Updates</TabsTrigger>
          </TabsList>
          {privacyPoints.map((point, index) => (
            <TabsContent key={index} value={point.tab}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <point.icon className="w-8 h-8" />
                    <span>{point.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    {point.content.split("\n\n").map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 text-gray-700">
                        {paragraph}
                      </p>
                    ))}
                    {point.list && (
                      <ul className="space-y-2 text-gray-700">
                        {point.list.map((item, iIndex) => (
                          <li key={iIndex} className="flex items-start">
                            <ChevronRight className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <Card className="mb-12 bg-gradient-to-r from-blue-100 to-purple-100 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Manage Your Cookie Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
                >
                  <Label
                    htmlFor={`cookie-${index}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </Label>
                  <Switch id={`cookie-${index}`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-12 bg-gradient-to-r from-green-100 to-blue-100 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Why Choose Automation eCom Global for Data Privacy?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 md:grid-cols-2">
              {chooseUsPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 bg-white p-4 rounded-lg shadow"
                >
                  <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" variant="destructive">
            Save Privacy Settings
          </Button>
        </div>
      </div>
    </div>
  );
}

const privacyPoints = [
  {
    icon: Lock,
    title: "Privacy Policy Overview",
    tab: "privacy",
    content:
      "Our Privacy Policy outlines how we collect, use, and safeguard your personal information when you interact with Automation eCom Global. Whether you're browsing our site, creating an account, or making a purchase, we ensure that your data is protected at all times. We adhere to global data protection regulations, including the General Data Protection Regulation (GDPR) for European customers and other international privacy laws, to guarantee your rights and privacy.\n\nKey elements of our Privacy Policy include:",
    list: [
      "Data collection: We collect information such as your name, email, address, and payment details when you create an account or make a purchase.",
      "Data usage: Your data is used to fulfill orders, provide customer support, and improve your experience on our site.",
      "Data storage: We use secure servers to store your data and retain it only for as long as necessary for legal and operational purposes.",
      "Data sharing: We do not share your data with third parties for marketing purposes without your consent. However, we may share data with trusted service providers, such as payment processors or logistics partners, to fulfill your orders.",
    ],
  },
  {
    icon: Cookie,
    title: "Cookie Policy and Settings",
    tab: "cookies",
    content:
      "Cookies are small text files stored on your device that allow us to enhance your experience on our website. Automation eCom Global uses cookies and similar tracking technologies to remember your preferences, optimize the functionality of our site, and analyze how users interact with our platform. Our Cookie Policy outlines the types of cookies we use, why we use them, and how you can manage your preferences.\n\nTypes of Cookies We Use:",
    list: [
      "Essential Cookies: These cookies are necessary for the core functionality of our website, such as enabling you to log in, add items to your cart, and complete transactions. Without these cookies, the site may not function properly.",
      "Performance Cookies: We use performance cookies to collect anonymous data about how visitors use our site. This information helps us improve the overall experience by optimizing website performance and identifying areas for improvement.",
      "Functional Cookies: These cookies allow us to remember your preferences, such as language settings, region, and past orders, so you have a more personalized experience.",
      "Targeting and Advertising Cookies: Targeting cookies are used to deliver relevant advertisements based on your browsing habits. These cookies help us and third-party advertisers provide ads that are more likely to interest you.",
    ],
  },
  {
    icon: UserCheck,
    title: "Managing Cookie Preferences",
    tab: "preferences",
    content:
      "At Automation eCom Global, we give you full control over how cookies are used on our website. When you visit our site, you will be prompted to set your cookie preferences via a cookie consent banner. You can accept all cookies, reject non-essential cookies, or customize your cookie settings based on your preferences.\n\nHow to Manage Cookies:",
    list: [
      'Cookie Banner: Upon your first visit, you can choose which types of cookies you allow. You can always update these settings by clicking the "Cookie Settings" link at the bottom of our website.',
      "Browser Settings: You can manage or block cookies through your browser settings. Most browsers allow you to delete cookies or prevent them from being saved on your device. However, please note that disabling cookies may impact certain features of our website, such as account login and checkout functionality.",
      "Third-Party Cookies: If you prefer not to have third-party cookies, such as those used for targeted advertising, you can opt out of these in your cookie settings or by adjusting your browser's privacy settings.",
    ],
  },
  {
    icon: RefreshCw,
    title: "Regular Updates to Privacy & Cookie Policies",
    tab: "updates",
    content:
      "As data privacy regulations evolve, Automation eCom Global regularly updates our Privacy & Cookie Policies to ensure compliance with the latest legal requirements and industry best practices. We will notify you of any significant changes to our policies, and we encourage you to review this section periodically to stay informed about how your data is being handled.",
  },
];

const cookieTypes = [
  "Essential Cookies",
  "Performance Cookies",
  "Functional Cookies",
  "Targeting and Advertising Cookies",
];

const chooseUsPoints = [
  "Full transparency: Our Privacy & Cookie Settings provide you with complete control over how your data is collected and used.",
  "Secure data storage: We use advanced encryption and security measures to protect your personal data.",
  "GDPR compliance: We adhere to international privacy laws, ensuring that your rights are respected and your data is handled responsibly.",
  "Easy cookie management: Customize your cookie preferences at any time to suit your privacy needs.",
  "Clear privacy policies: We provide clear information about how your data is used and shared, ensuring a secure and trustworthy experience.",
];
