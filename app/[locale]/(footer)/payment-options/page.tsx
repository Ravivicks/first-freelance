import {
  CreditCard,
  Building,
  Smartphone,
  FileText,
  Globe,
  Briefcase,
  DollarSign,
  CreditCardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PaymentOptionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="text-center mb-12 custom-bg p-4">
        <h1 className="text-3xl font-bold mb-4">Payment Options</h1>
        <p className="text-lg text-gray-600">
          {`At Automation eCom Global, we are committed to making your purchasing
          experience as convenient and flexible as possible. We understand that
          every business has unique financial needs and preferences, which is
          why we offer a wide range of payment options to accommodate customers
          from various regions and industries. Whether you're purchasing
          industrial automation products such as Siemens PLCs, Schneider HMIs,
          or DEIF controllers, our payment methods are designed to be secure,
          efficient, and tailored to your requirements.`}
        </p>
      </header>

      <Accordion type="single" collapsible className="mb-12">
        {paymentOptions.map((option, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <option.icon className="w-6 h-6" />
                <span>{option.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose max-w-none">
                {option.content.split("\n\n").map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
                {option.list && (
                  <ul>
                    {option.list.map((item, iIndex) => (
                      <li key={iIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Card className="mb-12 custom-bg-1">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {`Why Choose Automation eCom Global's Payment Options?`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {chooseUsPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <DollarSign className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button size="lg" variant="destructive">
          Start Shopping Now
        </Button>
      </div>
    </div>
  );
}

const paymentOptions = [
  {
    icon: CreditCard,
    title: "Credit and Debit Cards",
    content:
      "We accept all major credit and debit cards, making it easy for you to complete your transaction swiftly and securely. Automation eCom Global partners with reliable payment processors to ensure that your card information is protected using SSL encryption, preventing unauthorized access and safeguarding your financial data.\n\nPaying with a credit or debit card allows for instant transactions, meaning your order can be processed immediately, speeding up delivery times and ensuring that your products reach you as quickly as possible. This payment method is ideal for both domestic and international customers who prefer fast, secure payments.",
    list: ["Visa", "MasterCard", "American Express", "Discover"],
  },
  {
    icon: Building,
    title: "Bank Transfers",
    content:
      "For businesses handling larger orders or those who prefer direct payment methods, Automation eCom Global offers the option to pay via bank transfers. Bank transfers are a secure and reliable method for high-value transactions, particularly for customers making bulk purchases of automation products such as control panels, drives, or complete automation systems.\n\nBank transfers offer additional benefits, including:\n\nOnce the transfer is completed and confirmed, your order will be processed, and you will receive a notification regarding the shipping schedule. Our customer service team is always available to provide you with the necessary banking details and assist with any questions regarding international transfers.",
    list: [
      "No transaction limits: Suitable for large, high-volume orders.",
      "Reduced transaction fees compared to credit card payments for some regions.",
      "Security: Funds are transferred directly between your bank and ours, ensuring that sensitive financial details are not shared with third-party processors.",
    ],
  },
  {
    icon: CreditCardIcon,
    title: "PayPal",
    content:
      "We understand that many of our customers prefer using PayPal for online transactions, thanks to its ease of use and secure platform. Automation eCom Global supports PayPal payments for both domestic and international customers, providing a seamless payment option that requires no direct sharing of financial information.\n\nWith PayPal, you can:\n\nUsing PayPal is particularly beneficial for international customers who want a fast, easy payment method with minimal fees and currency conversion costs.",
    list: [
      "Pay quickly and securely without entering your card details every time.",
      "Link your bank account or credit card to your PayPal account for convenient payments.",
      "Benefit from PayPal's buyer protection in the rare event of a transaction dispute.",
    ],
  },
  {
    icon: Smartphone,
    title: "Digital Wallets (Apple Pay, Google Pay)",
    content:
      "For customers who prefer using mobile payment solutions, Automation eCom Global supports Apple Pay and Google Pay, providing a one-tap payment option that is both fast and secure. These digital wallets allow you to store your payment information securely on your mobile device, making transactions effortless.\n\nThe advantages of digital wallets include:\n\nDigital wallets are an excellent option for customers who want to complete transactions quickly and securely, especially when making purchases via mobile devices.",
    list: [
      "Touchless payments for increased convenience and safety.",
      "Tokenization technology that replaces sensitive card data with a unique digital identifier, reducing the risk of fraud.",
      "Faster checkout times for repeat customers.",
    ],
  },
  {
    icon: FileText,
    title: "Purchase Orders (PO) for Approved Customers",
    content:
      "For established customers or those making regular bulk purchases, Automation eCom Global offers the option to pay via purchase orders (PO). This method allows approved clients to place orders on credit, with payment due within a specified period after receiving the invoice.\n\nBenefits of using purchase orders include:\n\nTo apply for a PO payment option, customers must undergo a quick approval process. Once approved, you can place orders via your account portal or by contacting our sales team directly.",
    list: [
      "Flexibility in payment terms, typically ranging from 30 to 90 days, depending on your agreement with us.",
      "Streamlined procurement processes for businesses making frequent or large-scale orders.",
      "Enhanced cash flow management, as payment is deferred until the agreed-upon date.",
    ],
  },
  {
    icon: DollarSign,
    title: "Installment Plans for Large Orders",
    content:
      "At Automation eCom Global, we recognize that large-scale automation projects can require significant capital investment. To help you manage these expenses more easily, we offer flexible installment plans for eligible orders. This payment option allows businesses to spread the cost of their purchases over several months, making it easier to budget for critical automation upgrades.\n\nOur installment plans feature:\n\nThis option is ideal for businesses that are investing in large equipment, such as complete control systems, SCADA systems, or bulk orders of industrial components.",
    list: [
      "No hidden fees: You pay only the agreed-upon amount in equal installments over the designated period.",
      "Flexible payment schedules: Choose the number of installments that works best for your financial situation.",
      "No impact on order fulfillment: Your order is processed and delivered once the initial payment is made, without waiting for full payment.",
    ],
  },
  {
    icon: Globe,
    title: "International Payment Options",
    content:
      "At Automation eCom Global, we serve customers around the world, from Dubai to Germany, USA, China, India, and beyond. We support a wide range of international payment options to ensure a seamless purchasing experience, regardless of your location.\n\nInternational customers can benefit from:\n\nOur platform automatically calculates taxes, duties, and shipping costs based on your location, ensuring transparency in pricing and making it easy for you to complete international purchases without worrying about unexpected fees.",
    list: [
      "Currency conversion options: We accept multiple currencies and provide real-time exchange rates to ensure that you pay the correct amount in your local currency.",
      "Region-specific payment methods: In addition to global credit cards and PayPal, we accept region-specific payment methods such as Alipay in China and iDEAL in Europe.",
      "International bank transfers: For large international transactions, we offer bank transfer options with comprehensive support for currency conversion and cross-border payments.",
    ],
  },
  {
    icon: Briefcase,
    title: "Flexible Payment Terms for B2B Clients",
    content:
      "We understand that businesses often require additional payment flexibility, particularly for ongoing or large-scale projects. Automation eCom Global offers flexible payment terms for approved B2B clients, allowing you to negotiate terms that align with your company's cash flow and project timelines.\n\nOur flexible payment options include:\n\nBy offering customizable payment terms, we aim to build long-term partnerships with our B2B clients, providing the flexibility needed to succeed in competitive markets.",
    list: [
      "Net 30, Net 60, or Net 90 terms for established clients, allowing you to defer payment until after the delivery of goods.",
      "Custom payment schedules for long-term projects or repeat customers.",
      "Volume discounts and preferred payment plans for customers making bulk purchases.",
    ],
  },
];

const chooseUsPoints = [
  "Multiple payment methods: From credit cards and bank transfers to digital wallets and purchase orders, we offer a variety of payment options to suit your needs.",
  "Secure transactions: All payments are protected with advanced encryption and fraud detection systems.",
  "Global support: We accept international payments in multiple currencies and provide region-specific options.",
  "Flexible terms: We offer installment plans, POs, and custom payment schedules to help you manage large or ongoing projects.",
  "Fast processing: Instant payments mean faster order fulfillment and delivery.",
];