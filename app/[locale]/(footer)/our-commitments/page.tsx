"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { Award, DollarSign, Users, Globe, Leaf } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const iconMapping: { [key: string]: React.ElementType } = {
  Award,
  DollarSign,
  Users,
  Globe,
  Leaf,
};

export default function OurCommitments() {
  const t = useTranslations("ourCommitments.sections");
  const { onOpen } = useCommonEnquiry();

  return (
    <div className="container mx-auto md:px-4 px-1 py-8 space-y-12 max-w-6xl">
      {/* Introduction Section */}
      <section className="text-center space-y-4 custom-bg py-5 rounded-md">
        <h1 className="text-4xl font-bold tracking-tight">
          {t("introduction.title")}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto px-3 md:px-0">
          {t("introduction.paragraph")}
        </p>
      </section>

      {/* Driving Success Section */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">
            {t("drivingSuccess.title")}
          </h2>
          <p className="text-muted-foreground">
            {t("drivingSuccess.paragraph")}
          </p>
          <Button>{t("drivingSuccess.button")}</Button>
        </div>
        <Image
          src="/footer/placement.png?height=400&width=600"
          alt="Automation eCom Global commitment to excellence"
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
      </section>

      <Separator />

      {/* Key Commitments Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          {t("commitments.title")}
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {t.raw("commitments.lists").map((commitment: any, index: number) => {
            const IconComponent = iconMapping[commitment.icon];
            return (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  {IconComponent && (
                    <IconComponent className="w-12 h-12 mb-4 text-destructive" />
                  )}
                  <CardTitle>{commitment.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">
                    {commitment.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Separator />

      {/* Detailed Commitments Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          {t("detailedCommitments.title")}
        </h2>

        {t.raw("detailedCommitments.lists").map((item: any, index: number) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {item.paragraphs.map((paragraph: any, pIndex: number) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Experience Commitment Section */}
      <section className="text-center space-y-4 custom-bg-1 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold">
          {t("experienceCommitment.title")}
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {t("experienceCommitment.paragraph")}
        </p>
        <Button variant="destructive" onClick={() => onOpen("quickQuote")}>
          {t("experienceCommitment.button")}
        </Button>
      </section>
    </div>
  );
}
