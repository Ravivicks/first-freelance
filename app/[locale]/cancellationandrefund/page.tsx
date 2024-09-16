"use client";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Component() {
  const { locale } = useParams();
  useFetchStaticData(locale as string, "car");
  const {
    data: staticData,
    isLoading: staticLoading,
    error,
  } = useStaticDataStore();
  return (
    <div>
      <div className=" relative h-[300px] w-full my-4 ">
        <Image
          src="/images/refund.webp"
          alt="term"
          fill
          className="object-fill rounded-xl shadow-xl"
        />
      </div>
      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {staticData
                ? staticData?.cancellationAndRefund?.heading
                : "Cancellation and Refund Policy"}
            </h1>
            <p className="mt-4 text-muted-foreground">
              {staticData
                ? staticData?.cancellationAndRefund?.introduction
                : `PROSAFE AUTOMATION believes in helping its customers as far as
              possible, and has therefore a liberal cancellation policy. Under
              this policy:`}
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {staticData &&
                staticData?.cancellationAndRefund?.sections?.[0]?.title}
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>
                  {staticData &&
                    staticData?.cancellationAndRefund?.sections?.[0]?.items?.[0]
                      ?.strong}
                </strong>
                {staticData
                  ? staticData?.cancellationAndRefund?.sections?.[0]?.items?.[0]
                      ?.text
                  : `Cancellations will be considered
                only if the request is made within same day of placing the
                order. However, the cancellation request may not be entertained
                if the orders have been communicated to the vendors/merchants
                and they have initiated the process of shipping them.`}
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {staticData
                ? staticData?.cancellationAndRefund?.sections?.[1]?.title
                : "How to Request a Cancellation or Refund"}
            </h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <strong>
                  {staticData
                    ? staticData?.cancellationAndRefund?.sections?.[1]
                        ?.items?.[0]?.strong
                    : "Process:"}
                </strong>{" "}
                {staticData
                  ? staticData?.cancellationAndRefund?.sections?.[1]?.items?.[0]
                      ?.text
                  : `In case of receipt of damaged or
                defective items please report the same to our Customer Service
                team. The request will, however, be entertained once the
                merchant has checked and determined the same at his own end.
                This should be reported within same day of receipt of the
                products. In case you feel that the product received is not as
                shown on the site or as per your expectations, you must bring it
                to the notice of our customer service within same day of
                receiving the product. The Customer Service Team after looking
                into your complaint will take an appropriate decision.`}
              </li>
              <li>
                <strong>
                  {staticData
                    ? staticData?.cancellationAndRefund?.sections?.[1]
                        ?.items?.[1]?.strong
                    : "Response Time:"}
                </strong>{" "}
                {staticData
                  ? staticData?.cancellationAndRefund?.sections?.[1]?.items?.[1]
                      ?.text
                  : `In case of any Refunds approved
                by the PROSAFE AUTOMATION, it'll take 1-2 days for the refund to
                be processed to the end customer.`}
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              {staticData
                ? staticData?.cancellationAndRefund?.sections?.[2]?.title
                : "Customer Support"}
            </h2>
            <p className="text-muted-foreground">
              {staticData
                ? staticData?.cancellationAndRefund?.sections?.[2]?.paragraph
                : `If you have any questions or concerns about our cancellation and
              refund policy, please don't hesitate to reach out to our customer
              support team. We are here to assist you and ensure your shopping
              experience is a positive one.`}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Link
                href="#"
                className="inline-flex items-center rounded-xl bg-destructive px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                <MailOpenIcon className="mr-2 h-5 w-5" />
                {staticData
                  ? staticData?.cancellationAndRefund?.sections?.[2]
                      ?.contactLinks?.[0]?.text
                  : "Email Support"}
              </Link>
              <Link
                href="#"
                className="inline-flex items-center rounded-xl border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                prefetch={false}
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                {staticData
                  ? staticData?.cancellationAndRefund?.sections?.[2]
                      ?.contactLinks?.[1]?.text
                  : "Call Support"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MailOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
