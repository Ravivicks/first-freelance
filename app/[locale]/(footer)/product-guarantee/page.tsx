import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Shield, Check } from "lucide-react";

export default function Component() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl ">
        <header className="text-center mb-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h1 className="text-4xl font-bold mb-4">Product Guarantee</h1>
          <p className="text-xl max-w-3xl mx-auto">
            At Automation eCom Global, we stand behind the quality and
            reliability of every product we offer. Our commitment to excellence
            means that all the automation products you purchase from us come
            with a comprehensive Product Guarantee that ensures you receive only
            the best-in-class components and systems. From Siemens PLCs to DEIF
            engine controllers and Schneider HMIs, every product is backed by
            our strong guarantee, giving you peace of mind and confidence in
            your investment.
          </p>
        </header>

        <Accordion type="single" collapsible className="mb-12">
          {guaranteePoints.map((point, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold">
                {index + 1}. {point.title}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                {point.content.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="bg-blue-50 border-blue-200 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              {`Why Choose Automation eCom Global's Product Guarantee?`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-4 md:grid-cols-2">
              {chooseUsPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" variant="destructive">
            Contact Us for More Information
          </Button>
        </div>
      </div>
    </div>
  );
}

const guaranteePoints = [
  {
    title: "Industry-Leading Quality Assurance",
    content: [
      "As a trusted global supplier of industrial automation products, Automation eCom Global takes pride in partnering with leading manufacturers like Siemens, Schneider, DEIF, and ComAp, known for their high-quality engineering and rigorous quality control processes. Every product we sell undergoes extensive testing and inspection to ensure it meets the highest standards of performance, durability, and reliability.",
      "Our Product Guarantee reflects our commitment to providing you with only the best. Whether you're purchasing PLCs, HMIs, drives, or other industrial automation components, you can trust that every product has been carefully selected and inspected to deliver consistent and reliable performance in even the most demanding environments.",
    ],
  },
  {
    title: "Manufacturer Warranties",
    content: [
      "Most of the products we offer come with manufacturer warranties that cover defects in materials and workmanship for a specified period. These warranties vary by product and manufacturer, but typically cover your purchase for 12 to 36 months. For products like Siemens PLCs or DEIF engine controllers, the warranty ensures that any issues related to defects or malfunctions are promptly addressed by the manufacturer.",
      "As an authorized distributor for these top brands, Automation eCom Global works closely with manufacturers to facilitate any warranty claims and ensure that your product is repaired or replaced without unnecessary delays. Our team will guide you through the warranty process, making it as smooth and hassle-free as possible.",
    ],
  },
  {
    title: "Extended Warranty Options",
    content: [
      "To provide even greater peace of mind, Automation eCom Global offers extended warranty options on many of the products we sell. By opting for an extended warranty, you can protect your investment for longer and minimize the risk of unexpected repair or replacement costs down the line.",
      "Our extended warranties cover not only defects in materials and workmanship but also provide additional protection for critical components such as PLCs, drives, and HMIs that are subject to wear and tear over time. These extended warranties are designed to keep your systems running smoothly and help you maintain peak operational efficiency without worrying about unforeseen breakdowns.",
    ],
  },
  {
    title: "Guaranteed Compatibility and Performance",
    content: [
      "At Automation eCom Global, we guarantee that every product we offer is fully compatible with the relevant systems and applications for which it is designed. Whether you're purchasing a Siemens S7-1200 PLC for a manufacturing line or a ComAp controller for a hybrid energy system, we ensure that the product you receive will integrate seamlessly with your existing setup.",
      "Our technical experts are available to provide guidance and support throughout the purchasing process, helping you select the right components for your specific application. By offering expert consultation and ensuring compatibility, we minimize the risk of installation issues or performance disruptions, so you can focus on your core operations.",
    ],
  },
  {
    title: "Replacement and Repair Guarantees",
    content: [
      "If you experience any issues with a product during the warranty period, Automation eCom Global is committed to resolving the problem as quickly and efficiently as possible. We offer replacement and repair guarantees for all warranty-eligible products, ensuring that you are never left without critical equipment.",
      "In the event of a defect or malfunction, simply contact our customer support team, and we will work with you to arrange for a repair or a replacement product. We understand the importance of minimizing downtime, which is why we prioritize fast turnaround times for repairs and replacements, keeping your operations running smoothly.",
      "For certain high-priority or mission-critical components, we also offer advance replacement services, where we send a replacement unit before receiving the defective one, ensuring minimal disruption to your workflow.",
    ],
  },
  {
    title: "Return and Exchange Guarantee",
    content: [
      "As part of our comprehensive Product Guarantee, Automation eCom Global offers a return and exchange policy for products that do not meet your expectations or are found to be incompatible with your systems. If you are not fully satisfied with your purchase, or if you accidentally ordered the wrong product, you can take advantage of our hassle-free return and exchange options.",
      "We provide a clear, easy-to-follow process for returning products, and we'll help you find a suitable replacement if needed. Our goal is to ensure that you are completely satisfied with your purchase, whether that means exchanging a product for a different model or issuing a refund.",
    ],
  },
  {
    title: "Comprehensive Support During Warranty Period",
    content: [
      "Your experience with Automation eCom Global doesn't end after you receive your product. We provide ongoing support throughout the entire warranty period, helping you with any technical issues, configuration challenges, or maintenance questions. Our team of experts is available to ensure that your products continue to perform as expected and that you have the resources and knowledge needed to maximize the value of your automation systems.",
      "From answering questions about software updates to helping with system optimization, we are committed to ensuring that your investment in industrial automation is fully supported and protected.",
    ],
  },
  {
    title: "Commitment to Customer Satisfaction",
    content: [
      "At Automation eCom Global, customer satisfaction is our top priority. Our Product Guarantee reflects our unwavering commitment to providing high-quality products and excellent service. We go above and beyond to ensure that you are completely satisfied with every purchase, offering a combination of top-tier products, expert support, and reliable warranty protection.",
      "We regularly seek feedback from our customers to improve our offerings and services, ensuring that we continue to meet your needs and exceed your expectations. When you choose Automation eCom Global, you're not just buying a product—you're gaining a partner dedicated to your success.",
    ],
  },
];

const chooseUsPoints = [
  "Industry-leading quality assurance: All products are tested and inspected for superior performance and reliability.",
  "Manufacturer warranties: Enjoy peace of mind with comprehensive warranties from top brands like Siemens, Schneider, DEIF, and ComAp.",
  "Extended warranty options: Protect your investment for longer with flexible warranty plans.",
  "Guaranteed compatibility: We ensure that every product integrates seamlessly with your existing systems.",
  "Fast replacement and repairs: Minimize downtime with our quick turnaround on repairs and advance replacement services.",
  "Hassle-free returns and exchanges: Return or exchange products that don't meet your expectations with ease.",
  "Ongoing support: Access expert assistance throughout the warranty period to keep your systems running smoothly.",
];
