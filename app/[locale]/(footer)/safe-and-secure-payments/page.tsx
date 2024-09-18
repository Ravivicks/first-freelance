"use client";
import {
  Shield,
  CreditCard,
  Building,
  Smartphone,
  Lock,
  FileText,
  UserCheck,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import Link from "next/link";
import Loader from "@/components/Loader";
const iconMapping: { [key: string]: React.ElementType } = {
  Shield,
  CreditCard,
  Building,
  Smartphone,
  Lock,
  FileText,
  UserCheck,
  HelpCircle,
};

export default function SecurePaymentsPage() {
  const { locale } = useParams();
  useFetchStaticData(locale as string, "sasp");
  const { data: staticData, isLoading } = useStaticDataStore();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <Shield className="w-16 h-16 mx-auto mb-4 text-destructive" />
        <h1 className="text-3xl font-bold mb-4">
          {staticData
            ? staticData?.safeAndSecurePayments?.header?.title
            : `Safe and Secure Payments`}
        </h1>
        <p className="text-lg text-gray-600">
          {staticData
            ? staticData?.safeAndSecurePayments?.header?.description
            : `At Automation eCom Global, we prioritize the security and privacy of
          every transaction. We understand that, when purchasing industrial
          automation products, you need the assurance that your payment details
          and personal information are fully protected. That's why we've
          implemented a range of robust payment security measures to ensure that
          every transaction with us is safe, secure, and transparent. Whether
          you're purchasing Siemens PLCs, Schneider HMIs, or DEIF controllers,
          our platform offers you the peace of mind that comes with encrypted,
          secure payment processing.`}
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {staticData
          ? staticData?.safeAndSecurePayments?.securityFeatures.map(
              (feature: any, index: number) => {
                const IconComponent = iconMapping[feature.icon];
                return (
                  <Card key={index} className="flex flex-col">
                    <CardHeader>
                      {IconComponent && (
                        <IconComponent className="w-8 h-8 mb-2 text-destructive" />
                      )}
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              }
            )
          : securityFeatures.map((feature, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <feature.icon className="w-8 h-8 mb-2 text-destructive" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {staticData
            ? staticData?.safeAndSecurePayments?.paymentOptions?.title
            : `Multiple Payment Options:`}
        </h2>
        <p className="mb-4">
          {staticData
            ? staticData?.safeAndSecurePayments?.paymentOptions?.description
            : `To make your shopping experience convenient and seamless, Automation
          eCom Global offers a wide range of payment methods tailored to meet
          your business needs. We cater to international customers across Dubai,
          USA, China, India, Germany, and other regions, providing you with
          flexibility in how you pay for your purchases.`}
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {staticData ? (
            staticData?.safeAndSecurePayments?.paymentOptions?.options?.map(
              (option: any, index: number) => (
                <li key={index}>
                  <strong>{option.title}:</strong> {option.description}
                </li>
              )
            )
          ) : (
            <>
              <li>
                <strong>Credit and Debit Cards:</strong> We accept major credit
                and debit cards, including Visa, MasterCard, and American
                Express, ensuring that your transactions are processed swiftly
                and securely.
              </li>
              <li>
                <strong>Bank Transfers:</strong> For large orders or
                international clients, we offer bank transfer options, providing
                a reliable and secure way to complete high-value transactions.
                We work with leading banks to ensure that your funds are
                transferred safely and efficiently.
              </li>
              <li>
                <strong>PayPal:</strong> We support PayPal payments, offering a
                fast, easy, and secure way to pay for your orders without having
                to share your financial information directly.
              </li>
              <li>
                <strong>Digital Wallets:</strong> For customers who prefer
                mobile payment solutions, we offer compatibility with leading
                digital wallets such as Apple Pay and Google Pay, ensuring
                secure, one-tap payments.
              </li>
            </>
          )}
        </ul>
        <p className="mt-4">
          {staticData
            ? staticData?.safeAndSecurePayments?.paymentOptions?.conclusion
            : `Our multiple payment options are designed to provide you with the
          flexibility to choose the method that works best for your business,
          while maintaining the highest levels of security and compliance.`}
        </p>
      </section>

      <section className="custom-bg-1 p-8 rounded-lg mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {staticData
            ? staticData?.safeAndSecurePayments?.chooseUsTitle
            : `Why Choose Automation eCom Global for Secure Payments?`}
        </h2>
        <ul className="space-y-2">
          {staticData
            ? staticData?.safeAndSecurePayments?.chooseUsPoints.map(
                (point: any, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <Shield className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                )
              )
            : chooseUsPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
        </ul>
      </section>

      <div className="text-center">
        <Button size="lg" variant="destructive">
          <Link href="/">Start Secure Shopping</Link>
        </Button>
      </div>
    </div>
  );
}

const securityFeatures = [
  {
    icon: Lock,
    title: "Advanced Encryption Technology",
    description:
      "We use SSL encryption to protect your payment details during transmission between your browser and our servers.",
  },
  {
    icon: FileText,
    title: "PCI DSS Compliance",
    description:
      "We adhere to Payment Card Industry Data Security Standard regulations to maintain a secure environment for handling credit card information.",
  },
  {
    icon: Shield,
    title: "Fraud Prevention and Detection",
    description:
      "Our sophisticated fraud detection systems monitor every transaction in real-time, identifying and flagging any suspicious activity.",
  },
  {
    icon: CreditCard,
    title: "Secure Payment Gateways",
    description:
      "We partner with trusted payment gateways that prioritize security and provide smooth, secure transactions.",
  },
  {
    icon: FileText,
    title: "Transparent Payment Process",
    description:
      "We ensure our payment process is fully transparent, providing you with all the information you need to understand your transaction.",
  },
  {
    icon: UserCheck,
    title: "Data Privacy Protection",
    description:
      "We follow strict data privacy regulations to ensure that your information is never shared or sold to third parties without your consent.",
  },
  {
    icon: Smartphone,
    title: "Two-Factor Authentication (2FA)",
    description:
      "We support two-factor authentication for transactions, adding an extra layer of security to protect your account.",
  },
  {
    icon: HelpCircle,
    title: "Dispute Resolution and Refund Protection",
    description:
      "We provide dispute resolution services and offer full protection for eligible refunds to resolve any issues quickly and fairly.",
  },
];

const chooseUsPoints = [
  "Multiple secure payment options: Choose from credit cards, bank transfers, PayPal, and digital wallets.",
  "Advanced encryption: All transactions are protected by SSL encryption for maximum security.",
  "PCI DSS compliant: We adhere to the highest industry standards for payment security.",
  "Fraud prevention systems: Sophisticated monitoring tools protect your transactions from fraud.",
  "Transparent charges: No hidden fees—know exactly what you're paying for before completing your purchase.",
  "Data privacy: Your personal information is secure and never shared without your consent.",
];
