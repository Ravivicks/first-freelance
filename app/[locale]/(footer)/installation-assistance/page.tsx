"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import Loader from "@/components/Loader";

export default function InstallationAssistance() {
  const { locale } = useParams();
  const t = useTranslations("installationAssistance");

  return (
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">{t("title")}</h1>

      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>{t("subTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t("intro")}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="expert-guidance" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4">
          {Object.keys(t.raw("tabs")).map((key) => (
            <TabsTrigger key={key} value={key}>
              {t(`tabs.${key}.tab`)}
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(t.raw("tabs")).map(
          ([key, tab]: [key: any, tab: any]) => (
            <TabsContent key={key} value={key}>
              <Card>
                <CardHeader>
                  <CardTitle>{tab.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{tab.content}</p>
                </CardContent>
              </Card>
            </TabsContent>
          )
        )}
      </Tabs>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("additionalServices.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {t
              .raw("additionalServices.items")
              .map((item: string, index: number) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold">
                    {item.split(":")[0]}
                  </h3>
                  <p>{item.split(":")[1]}</p>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("whyChoose.title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            {t.raw("whyChoose.items").map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
