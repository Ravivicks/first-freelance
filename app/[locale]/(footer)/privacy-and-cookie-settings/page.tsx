"use client";
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
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";

const iconMapping: { [key: string]: React.ElementType } = {
  Shield,
  Cookie,
  Lock,
  RefreshCw,
  UserCheck,
  ChevronRight,
};

export default function PrivacyCookieSettingsPage() {
  const { locale } = useParams();
  const t = useTranslations("privacyAndCookieSettings");

  return (
    <div className="min-h-screen">
      <div className="container mx-auto md:px-4 px-1 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <Shield className="w-20 h-20 mx-auto mb-6 text-destructive" />
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl max-w-6xl mx-auto">{t("description")}</p>
        </header>

        <Tabs defaultValue="privacy" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {t.raw("privacyPoints").map((point: any, index: number) => {
              const IconComponent = iconMapping[point.icon];
              return (
                <TabsTrigger key={index} value={point.tab}>
                  {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
                  <span className="capitalize">{point.tab}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {t.raw("privacyPoints").map((point: any, index: number) => {
            const IconComponent = iconMapping[point.icon];
            return (
              <TabsContent key={index} value={point.tab}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex md:items-center flex-col md:flex-row gap-2 text-2xl">
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 text-destructive self-start" />
                      )}
                      <span>{t(point.title)}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      {point.content
                        .split("\n\n")
                        .map((paragraph: any, pIndex: number) => (
                          <p key={pIndex} className="mb-4 text-gray-700">
                            {paragraph}
                          </p>
                        ))}
                      {point.list && (
                        <ul className="space-y-2 text-gray-700">
                          {point.list.map((item: any, iIndex: number) => (
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
            );
          })}
        </Tabs>

        <Card className="mb-12 bg-gradient-to-r from-blue-100 to-purple-100 border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {t("manageTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {t.raw("cookieTypes").map((type: any, index: number) => (
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
              {t("whyChooseText")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 md:grid-cols-2">
              {t.raw("chooseUsPoints").map((point: any, index: number) => (
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
      </div>
    </div>
  );
}
