"use client";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useTranslations } from "next-intl"; // Import useTranslations
import { Button } from "@/components/ui/button";

export default function Component() {
  const router = useRouter();
  const t = useTranslations("about"); // Use translations for the "about" namespace

  const { onOpen } = useCommonEnquiry();

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section>
          <div className="relative w-full h-[300px] mt-5">
            <Image
              src={t("banner.imageSrc")}
              alt={t("banner.imageAlt")}
              fill
              className="object-fit rounded-md"
            />
          </div>
        </section>
        <section className="w-full pt-12 md:pt-24 lg:pt-24 border-b-2">
          <div className="mx-6 md:px-6 space-y-10 xl:space-y-16 mb-10">
            <div className="grid max-w-[1300px] mx-auto gap-4 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] mb-2">
                  {t("section1.heading")}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("section1.description")}
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-xl bg-muted px-3 py-1 text-sm">
                  {t("section1.subSection.title")}
                </div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {t("section1.subSection.description")}
                </p>
                <div className="space-x-4">
                  <Button
                    variant="destructive"
                    onClick={() =>
                      router.push("/product-details/siemens?type=all")
                    }
                  >
                    {t("section1.links.exploreProducts.label")}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => router.push("/contact-us")}
                  >
                    {t("section1.links.contactUs.label")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-1 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-xl bg-muted md:px-3 py-1 text-sm">
                  {t("section2.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t("section2.heading")}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("section2.description")}
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {t.raw("section2.cards").map((card: any, index: number) => (
                <Card className="grid gap-1 rounded-xl h-full" key={index}>
                  <CardContent>
                    <CardHeader className="py-4 px-0">
                      <h3 className="text-lg font-bold">{card.title}</h3>
                    </CardHeader>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="md:w-[80%] mx-auto py-12 md:py-24 lg:py-16 border rounded-xl shadow-md custom-bg">
          <div className="container grid items-center justify-center gap-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {t("section3.heading")}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("section3.description")}
              </p>
            </div>
            <Button
              variant="destructive"
              className="mt-5 md:w-1/2 mx-auto"
              onClick={() => onOpen("quoteRequest")}
            >
              {t("section3.requestQuoteButton")}
            </Button>
            {/* Uncomment and implement team members if needed
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {t("section3.teamMembers").map((member: any, index: number) => (
                <div className="flex flex-col items-center space-y-2" key={index}>
                  <Avatar>
                    <AvatarImage src={member.imageSrc} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {t("section4.heading")}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t("section4.description")}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                variant="destructive"
                className="w-full md:w-fit"
                onClick={() => router.push("/product-details/siemens?type=all")}
              >
                {t("section4.links.viewProducts.label")}
              </Button>

              <Button
                variant="outline"
                className="w-full md:w-fit"
                onClick={() => router.push("/contact-us")}
              >
                {t("section4.links.contactUs.label")}
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
