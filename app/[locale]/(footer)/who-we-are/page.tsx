"use client";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { Globe, Cpu, Users, Zap } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

const iconMapping: { [key: string]: React.ElementType } = {
  Globe,
  Cpu,
  Users,
  Zap,
};

export default function WhoWeAre() {
  const { locale } = useParams();
  const t = useTranslations("whoWeAre");
  const { onOpen } = useCommonEnquiry();

  if (!t) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-2 py-8 space-y-12 max-w-6xl">
      <section className="text-center space-y-4 custom-bg py-5 rounded-md">
        <h1 className="text-4xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-3 md:px-0">
          {t("introText")}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center justify-between">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">
            {t("globalPresence.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("globalPresence.description")}
          </p>
        </div>
        <Image
          src="/footer/hiring.png?height=400&width=600"
          alt="Global map showing Automation eCom Global's presence"
          width={600}
          height={300}
          className="rounded-lg object-cover"
        />
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          {t("expertise.title")}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.raw("expertise.items").map((item: any, index: number) => {
            const IconComponent = iconMapping[item.icon];
            return (
              <Card key={index}>
                <CardContent className="pt-6 text-center space-y-4">
                  {IconComponent && (
                    <IconComponent className="w-12 h-12 mx-auto text-destructive" />
                  )}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          {t("productRange.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {t.raw("productRange.categories").map((item: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  {item.items.map((subItem: any, subIndex: number) => (
                    <li key={subIndex}>{subItem}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          {t("whyChooseUs.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {t.raw("whyChooseUs.items").map((item: any, index: number) => (
            <Card key={index}>
              <CardContent className="pt-6 text-center space-y-4">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center space-y-4 bg-gradient-to-r from-green-100 to-blue-100 border-none shadow-lg p-8 rounded-lg">
        <h2 className="text-3xl font-semibold">{t("callToAction.title")}</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {t("callToAction.description")}
        </p>
        <Button variant="destructive" onClick={() => onOpen("serviceQuote")}>
          {t("callToAction.buttonText")}
        </Button>
      </section>
    </div>
  );
}
