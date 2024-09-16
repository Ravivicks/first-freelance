"use client";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useGetOtherPageData } from "@/features/static-data/use-get-other";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

export default function Component() {
  const { locale } = useParams();
  useFetchStaticData(locale as string, "about");
  const {
    data: staticData,
    isLoading: staticLoading,
    error,
  } = useStaticDataStore();

  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section>
          <div className="relative w-full h-[300px] mt-5">
            <Image
              src="/images/about.jpg"
              alt="banner-about"
              fill
              className="object-fit rounded-2xl"
            />
          </div>
        </section>
        <section className="w-full pt-12 md:pt-24 lg:pt-24 border-b-2">
          <div className=" mx-6 px-4 md:px-6 space-y-10 xl:space-y-16 mb-10">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] mb-2">
                  {staticData
                    ? staticData?.about?.section1?.heading
                    : "Powering Industrial Automation"}
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {staticData
                    ? staticData?.about?.section1?.description
                    : `PROSAFE AUTOMATION is a leading provider of cutting-edge
                  industrial automation solutions. Our mission is to empower
                  businesses with the tools and expertise they need to
                  streamline their operations and drive innovation.`}
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-xl bg-muted px-3 py-1 text-sm">
                  {staticData
                    ? staticData?.about?.section1?.subSection?.title
                    : "About Us"}
                </div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  {staticData
                    ? staticData?.about?.section1?.subSection?.description
                    : `Founded in 1985, PROSAFE AUTOMATION has been at the forefront
                  of the industrial automation industry, providing cutting-edge
                  solutions to businesses across a wide range of sectors. Our
                  team of experts is dedicated to helping our clients achieve
                  their goals through innovative technology and unparalleled
                  customer service.`}
                </p>
                <div className="space-x-4">
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    {staticData
                      ? staticData?.about?.section1?.links?.exploreProducts
                          ?.label
                      : "Explore Products"}
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-9 items-center justify-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    {staticData
                      ? staticData?.about?.section1?.links?.contactUs?.label
                      : "Contact Us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-xl bg-muted px-3 py-1 text-sm">
                  {staticData
                    ? staticData?.about?.section2?.title
                    : "Our Expertise"}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {staticData
                    ? staticData?.about?.section2?.heading
                    : "Mastering Industrial Automation"}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {staticData
                    ? staticData?.about?.section2?.description
                    : ` With over 35 years of experience in the industrial automation
                  industry, PROSAFE AUTOMATION has developed a deep
                  understanding of the challenges and opportunities facing our
                  clients. Our team of experts is dedicated to providing
                  cutting-edge solutions that help businesses streamline their
                  operations, increase efficiency, and drive innovation.`}
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {staticData &&
                staticData?.about?.section2?.cards?.map(
                  (card: any, index: number) => (
                    <Card className="grid gap-1 rounded-xl h-full" key={index}>
                      <CardContent>
                        <CardHeader>
                          <h3 className="text-lg font-bold">{card.title}</h3>
                        </CardHeader>
                        <p className="text-sm text-muted-foreground">
                          {card.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-16 border rounded-full shadow-md bg-destructive/5">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {staticData
                  ? staticData?.about?.section3?.heading
                  : "Meet the PROSAFE AUTOMATION Team"}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {staticData
                  ? staticData?.about?.section3?.description
                  : `Our team of experts is dedicated to providing our clients with
                the best possible solutions and support.`}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {staticData &&
                staticData?.about?.section3?.teamMembers.map(
                  (teamMember: any, index: number) => (
                    <div
                      className="flex flex-col items-center space-y-2"
                      key={index}
                    >
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-sm font-medium">{teamMember.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {teamMember.role}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {staticData
                  ? staticData?.about?.section4?.heading
                  : "Explore Our Product Catalog"}
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {staticData
                  ? staticData?.about?.section4?.description
                  : `PROSAFE AUTOMATION offers a wide range of cutting-edge
                industrial automation products to meet the diverse needs of our
                clients.`}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-destructive px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {staticData
                  ? staticData?.about?.section4?.links?.viewProducts?.label
                  : "View Products"}
              </Link>
              <Link
                href="#"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                {staticData
                  ? staticData?.about?.section4?.links?.contactUs?.label
                  : "Contact Us"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
