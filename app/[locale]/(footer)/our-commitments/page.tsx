"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useCommonEnquiry } from "@/hooks/use-common-enquiry-open";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import { Award, DollarSign, Users, Globe, Leaf } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const iconMapping: { [key: string]: React.ElementType } = {
  Award,
  DollarSign,
  Users,
  Globe,
  Leaf,
};

export default function OurCommitments() {
  const { locale } = useParams();
  useFetchStaticData(locale as string, "oc");
  const { data: staticData } = useStaticDataStore();
  const { onOpen } = useCommonEnquiry();

  const commitments = [
    {
      icon: Award,
      title: "Quality and Innovation",
      description:
        "We offer the highest quality products from industry leaders like Siemens, Schneider, DEIF, and ComAp, while staying at the forefront of Industry 4.0 technologies.",
    },
    {
      icon: DollarSign,
      title: "Cost-Effectiveness",
      description:
        "We provide the best market discounts on premium products, offering German engineering precision at competitive prices.",
    },
    {
      icon: Users,
      title: "Customer Satisfaction",
      description:
        "Our dedicated team provides comprehensive support, from pre-sales consultation to post-sales assistance, ensuring optimal solutions for every client.",
    },
    {
      icon: Globe,
      title: "Global Reach and Local Support",
      description:
        "With a strong presence in Dubai, USA, China, India, and Germany, we offer worldwide delivery and localized support.",
    },
    {
      icon: Leaf,
      title: "Sustainability and Social Responsibility",
      description:
        "We're committed to providing energy-efficient solutions and supporting environmental and social initiatives in our communities.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <section className="text-center space-y-4 custom-bg py-5 rounded-md">
        <h1 className="text-4xl font-bold tracking-tight">
          {staticData
            ? staticData?.ourCommitments?.sections?.introduction?.title
            : `Our Commitments`}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {staticData
            ? staticData?.ourCommitments?.sections?.introduction?.paragraph
            : `At Automation eCom Global, our commitments form the backbone of
          everything we do. We are dedicated to driving the success of our
          clients through innovative, reliable, and cost-effective industrial
          automation solutions.`}
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">
            {staticData
              ? staticData?.ourCommitments?.sections?.drivingSuccess?.title
              : `Driving Success Through Commitment`}
          </h2>
          <p className="text-muted-foreground">
            {staticData
              ? staticData?.ourCommitments?.sections?.drivingSuccess?.paragraph
              : `Our unwavering focus on delivering the highest standards of quality,
            paired with competitive pricing and world-class customer service, is
            what sets us apart in the global automation market.`}
          </p>
          <Button>
            {staticData
              ? staticData?.ourCommitments?.sections?.drivingSuccess?.button
              : `Discover Our Solutions`}
          </Button>
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

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          Our Key Commitments
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {staticData
            ? staticData?.ourCommitments?.sections?.commitments.map(
                (commitment: any, index: number) => {
                  const IconComponent = iconMapping[commitment.icon];
                  return (
                    <Card key={index} className="flex flex-col">
                      <CardHeader>
                        {IconComponent && (
                          <IconComponent className="w-12 h-12 mb-4 text-primary" />
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
                }
              )
            : commitments.map((commitment, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <commitment.icon className="w-12 h-12 mb-4 text-primary" />
                    <CardTitle>{commitment.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">
                      {commitment.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </section>

      <Separator />

      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">
          Detailed Commitments
        </h2>

        {staticData ? (
          staticData?.ourCommitments?.sections?.detailedCommitments?.map(
            (item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.paragraphs.map((paragraph: any, index: number) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </CardContent>
              </Card>
            )
          )
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>1. Commitment to Quality and Innovation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We are deeply committed to offering the highest quality
                  products, sourced from some of the most respected names in the
                  industry. Our partnerships with Siemens, Schneider, DEIF, and
                  ComAp ensure that our customers receive durable,
                  high-performance equipment.
                </p>
                <p>
                  We are constantly expanding our product offerings to include
                  the latest Industry 4.0 technologies, including IoT-based
                  solutions, remote monitoring, predictive maintenance, and
                  advanced automation systems.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Commitment to Cost-Effectiveness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our ability to offer the best market discounts on Siemens
                  products—such as S7-1200, S7-1500, and S7-300 PLCs—is a
                  testament to our commitment to affordability without
                  compromising quality.
                </p>
                <p>
                  {`By choosing Automation eCom Global, clients gain access to
              Siemens' German engineering precision at a fraction of the market
              price, along with reliable solutions from DEIF and ComAp.`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Commitment to Customer Satisfaction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our team of experienced engineers and automation specialists
                  work closely with clients to understand their unique
                  challenges and tailor solutions that best meet their
                  operational goals.
                </p>
                <p>
                  We provide guidance on installation, commissioning, and
                  maintenance, ensuring that every solution we deliver is
                  optimized for long-term success.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  4. Commitment to Global Reach and Local Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our international reach allows us to provide fast, reliable
                  delivery of products worldwide, ensuring that businesses
                  across various geographies can benefit from our automation
                  solutions.
                </p>
                <p>
                  We offer localized support to ensure that customers receive
                  the assistance they need in their specific markets, from
                  localized customer service teams to region-specific product
                  recommendations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  5. Commitment to Sustainability and Social Responsibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We are committed to providing solutions that help businesses
                  reduce their carbon footprint while increasing efficiency. Our
                  product offerings include energy-efficient automation systems
                  that not only optimize production but also minimize
                  environmental impact.
                </p>
                <p>
                  A portion of our profits goes towards supporting environmental
                  causes, social initiatives, and projects that benefit local
                  communities, such as those focusing on education and animal
                  welfare.
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </section>

      <section className="text-center space-y-4 custom-bg-1 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold">
          {staticData
            ? staticData?.ourCommitments?.sections?.experienceCommitment?.title
            : `Experience Our Commitment`}
        </h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          {staticData
            ? staticData?.ourCommitments?.sections?.experienceCommitment
                ?.paragraph
            : `At Automation eCom Global, we're more than just a supplier. We're your
          committed partner in industrial automation, dedicated to your success,
          innovation, and sustainable growth.`}
        </p>
        <Button variant="destructive" onClick={() => onOpen("serviceQuote")}>
          {staticData
            ? staticData?.ourCommitments?.sections?.experienceCommitment?.button
            : `Contact Us Today`}
        </Button>
      </section>
    </div>
  );
}
