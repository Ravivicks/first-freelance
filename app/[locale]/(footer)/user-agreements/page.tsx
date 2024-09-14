import { Check, ChevronDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function UserAgreementPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-12">
          <FileText className="w-16 h-16 mx-auto mb-4 text-destructive" />
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            User Agreement
          </h1>
          <p className="text-lg text-gray-600 max-w-6xl mx-auto">
            At Automation eCom Global, we are committed to ensuring that your
            experience on our platform is secure, transparent, and
            straightforward. Our User Agreements provide you with clear
            guidelines on the terms and conditions governing your use of our
            website, products, and services. These agreements are designed to
            protect both our customers and our business, ensuring a fair and
            ethical relationship while providing a seamless and trustworthy
            shopping experience. By using our website and making purchases, you
            agree to comply with the policies and terms set forth in these
            agreements.
          </p>
        </header>

        <Accordion type="single" collapsible className="mb-12">
          {agreementPoints.map((point, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold text-gray-800">
                <span className="flex items-center gap-2">
                  <span>{index + 1}.</span> {point.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 space-y-4 pt-4">
                {point.content.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
                {point.list && (
                  <ul className="list-disc pl-5 space-y-2">
                    {point.list.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="mb-12 custom-bg-1">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Why Choose Automation eCom Global?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {chooseUsPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button size="lg" variant="destructive">
            Accept Agreement
          </Button>
        </div>
      </div>
    </div>
  );
}

const agreementPoints = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing and using the Automation eCom Global website, you agree to be bound by the terms and conditions outlined in our User Agreements. These terms cover the use of the site, our products, services, and the rights and responsibilities of both Automation eCom Global and you, the user. If you do not agree with any part of these terms, you should discontinue use of the site immediately.\n\nYour continued use of our platform constitutes your acceptance of the User Agreements and any subsequent updates or modifications. We encourage you to regularly review the terms to stay informed of any changes that may affect your rights and obligations.",
  },
  {
    title: "Account Creation and Responsibilities",
    content:
      "To make a purchase on Automation eCom Global, you may be required to create a user account. When creating an account, you agree to provide accurate, current, and complete information about yourself and your company. You are responsible for maintaining the confidentiality of your account credentials, including your username and password, and for any actions that occur under your account.\n\nAutomation eCom Global reserves the right to suspend or terminate accounts that violate our terms, engage in fraudulent activities, or misuse the platform.\n\nBy creating an account, you agree to:",
    list: [
      "Ensure that your account information is up to date.",
      "Use your account in compliance with the terms outlined in this agreement.",
      "Notify us immediately of any unauthorized use of your account or breach of security.",
    ],
  },
  {
    title: "Product Information and Accuracy",
    content:
      "We strive to provide detailed and accurate information regarding the products available on Automation eCom Global, including specifications, pricing, availability, and descriptions. However, errors or omissions may occasionally occur. Automation eCom Global reserves the right to correct such inaccuracies at any time without prior notice, including after an order has been submitted.\n\nWe make every effort to display products accurately, but the actual appearance, specifications, and availability of products may vary slightly due to manufacturer updates or availability. We recommend verifying critical details with our sales team or technical support before making a purchase to ensure the products meet your specific requirements.",
  },
  {
    title: "Pricing and Payment Terms",
    content:
      "All prices displayed on Automation eCom Global are in the applicable currency for your region and are subject to change without notice. We reserve the right to modify pricing at any time, and any pricing errors identified after an order is placed will be addressed promptly.\n\nWhen you place an order, you agree to the pricing and payment terms associated with that purchase. Automation eCom Global offers multiple payment methods, including credit cards, bank transfers, PayPal, and more, as outlined in our Payment Options section.\n\nBy completing a purchase, you confirm that:",
    list: [
      "You are authorized to use the payment method provided.",
      "The payment details you submit are accurate and complete.",
      "You agree to pay all charges, including any taxes, shipping, and handling fees associated with your order.",
    ],
  },
  {
    title: "Shipping and Delivery Terms",
    content:
      "Our User Agreements include the terms and conditions related to the shipping and delivery of products purchased from Automation eCom Global. We make every effort to deliver your products on time, as outlined in our Delivery Information section. However, Automation eCom Global cannot be held liable for delays caused by external factors, such as shipping carrier issues, customs, or force majeure events.\n\nWe encourage you to review the shipping and delivery terms to understand the timelines, costs, and tracking options available for your region. By placing an order, you agree to accept the shipping terms for your chosen delivery method and any associated charges.",
  },
  {
    title: "Returns, Exchanges, and Warranty Claims",
    content:
      "As part of our User Agreements, we clearly outline the conditions for returns, exchanges, and warranty claims. You can review our Return & Exchanges policy to understand the specific steps for initiating a return or exchange, as well as the eligibility requirements for warranty claims.\n\nBy using our platform, you agree to adhere to the following:",
    list: [
      "All returns and exchanges must comply with the Return & Exchange Policy.",
      "Warranty claims are subject to the terms provided by the product manufacturers.",
      "You will be responsible for return shipping costs unless the product is defective or damaged upon receipt.",
    ],
  },
  {
    title: "Intellectual Property and License to Use",
    content:
      "All content on the Automation eCom Global website, including but not limited to text, graphics, logos, images, and software, is the intellectual property of Automation eCom Global or our suppliers and is protected by international copyright, trademark, and intellectual property laws.\n\nBy accessing our platform, you agree to use the content solely for personal or business purposes related to purchasing products or learning more about our services. You may not:",
    list: [
      "Copy, modify, distribute, or reproduce content without explicit permission.",
      "Use any data mining, robots, or similar data-gathering tools on our website.",
      "Use our content for any commercial purposes without proper authorization.",
    ],
  },
  {
    title: "Limitation of Liability",
    content:
      "While Automation eCom Global strives to provide accurate information and high-quality products, we cannot be held liable for any indirect, incidental, or consequential damages that result from the use of our platform, products, or services. This includes, but is not limited to, damages related to:",
    list: [
      "Loss of revenue or profits.",
      "Business interruptions.",
      "Data loss or corruption.",
      "Unavailability of products or services.",
    ],
  },
  {
    title: "Changes to User Agreements",
    content:
      "Automation eCom Global reserves the right to modify or update these User Agreements at any time without prior notice. Any changes will be posted on our website, and it is your responsibility to review the updated terms regularly. By continuing to use our platform after changes are posted, you agree to the revised terms.\n\nWe will make reasonable efforts to notify you of significant updates, such as changes that affect your rights or obligations, but we encourage you to check this section frequently for the latest updates.",
  },
  {
    title: "Governing Law and Dispute Resolution",
    content:
      "These User Agreements are governed by the laws of the country in which Automation eCom Global operates, and any disputes arising from the use of our platform or products will be resolved under the jurisdiction of the courts in that region.\n\nIn the event of a dispute, both parties agree to attempt good faith negotiations before resorting to formal legal action. If a resolution cannot be reached, any claims or disputes will be settled in accordance with the laws and regulations of the governing jurisdiction.",
  },
];

const chooseUsPoints = [
  "Clear and transparent terms: Our User Agreements outline your rights and responsibilities when using our platform.",
  "Comprehensive coverage: From account creation to warranties, we provide clear guidelines to protect both you and our business.",
  "Fair dispute resolution: We are committed to resolving disputes amicably and in accordance with the governing laws.",
  "Intellectual property protection: Our terms ensure that our content and services are protected from unauthorized use.",
];
