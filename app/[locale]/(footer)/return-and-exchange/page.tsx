"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeftRight,
  Package,
  Truck,
  Clock,
  CheckCircle,
  AlertTriangle,
  HelpCircle,
  Globe,
  RefreshCw,
} from "lucide-react";

export default function ReturnAndExchange() {
  const [orderNumber, setOrderNumber] = useState("");

  const handleInitiateReturn = () => {
    // This would typically involve an API call to your backend
    console.log(`Initiating return for order number: ${orderNumber}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Returns and Exchanges
      </h1>

      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>Our Commitment to Your Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {`At Automation eCom Global, we understand that your business depends
            on receiving the right products in optimal condition, and we strive
            to deliver exactly that. However, we also recognize that, on
            occasion, returns or exchanges may be necessary due to a variety of
            reasons such as incorrect orders, defective products, or the need
            for different configurations. That's why we offer a hassle-free,
            efficient return and exchange process designed to make it easy for
            you to get the right products and maintain your operations without
            disruption.`}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Return and Exchange Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  1. Simple and Transparent Return Policy
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our return policy is designed to be as simple and
                    transparent as possible. If for any reason you are not
                    satisfied with your purchase, you can initiate a return or
                    exchange within the eligible timeframe—usually 30 days from
                    the date of delivery. We believe in keeping the process
                    straightforward, ensuring that you can easily return or
                    exchange products without unnecessary complications.
                  </p>
                  <p className="mt-2">
                    Eligible products include most items from our catalog, such
                    as Siemens PLCs, Schneider HMIs, DEIF engine controllers,
                    and other industrial automation components. However, some
                    custom or special-order products may have specific return
                    policies, which will be communicated to you at the time of
                    purchase.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  2. Steps to Initiate a Return or Exchange
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      Contact Customer Support: Reach out to our customer
                      support team via email, phone, or through your customer
                      portal to start the return or exchange process. Please
                      provide your order number and details about the product
                      you wish to return or exchange.
                    </li>
                    <li>
                      Receive Authorization: Once your request is reviewed, we
                      will issue a Return Merchandise Authorization (RMA)
                      number, which you will need to include with the returned
                      product. This ensures that your return is processed
                      quickly and accurately.
                    </li>
                    <li>
                      Package the Product: Ensure that the product is securely
                      packaged, using the original packaging if possible, to
                      avoid any damage during return shipping. For items like
                      PLCs, HMIs, or other sensitive components, we recommend
                      using protective packaging to ensure the product arrives
                      in good condition.
                    </li>
                    <li>
                      Ship the Product: Send the package using the shipping
                      label we provide. For eligible returns, we offer prepaid
                      return shipping, making the process even more convenient.
                    </li>
                    <li>
                      Receive Refund or Replacement: Once we receive the
                      returned product and confirm its condition, we will
                      process your refund, replacement, or exchange. Refunds are
                      typically issued within 7-10 business days, while
                      replacements are shipped immediately if the item is in
                      stock.
                    </li>
                  </ol>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  3. Conditions for Returns and Exchanges
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Products must be returned in their original condition,
                      with all accessories, manuals, and packaging included.
                    </li>
                    <li>
                      Custom-built or specially configured items, such as custom
                      control panels or integrated systems, may not be eligible
                      for returns unless there is a defect or issue with the
                      product. In such cases, we will work with you to resolve
                      the matter quickly.
                    </li>
                    <li>
                      Products that have been installed or used in the field may
                      require an evaluation before being approved for a return
                      or exchange. Our technical team will assess the condition
                      of the product and determine the next steps.
                    </li>
                    <li>
                      For products that are returned due to incorrect orders or
                      customer preference, a restocking fee may apply. This fee
                      will be communicated to you before the return is
                      processed.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  4. Handling Defective or Damaged Products
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    If you receive a product that is defective or damaged upon
                    arrival, Automation eCom Global takes immediate action to
                    resolve the issue. We offer:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li>
                      Immediate exchanges for defective products at no
                      additional cost. Simply contact our support team, and we
                      will arrange for a replacement to be shipped as soon as
                      possible.
                    </li>
                    <li>
                      For products that arrive damaged during shipping, we will
                      handle the shipping claim with our logistics partners and
                      ensure that you receive a replacement without delay.
                    </li>
                  </ul>
                  <p className="mt-2">
                    All defective or damaged products must be reported within 7
                    days of receiving the shipment. Please provide photographic
                    evidence of the defect or damage to help us expedite the
                    process.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  5. Exchange for Different Products or Configurations
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    {`We understand that business needs can change, and sometimes
                    you may require a different product or configuration after
                    placing an order. At Automation eCom Global, we offer a
                    flexible exchange policy that allows you to swap products
                    for different models or configurations, whether it's
                    upgrading to a higher-performance Siemens PLC or changing
                    the specifications of an engine controller.`}
                  </p>
                  <p className="mt-2">
                    Simply contact our support team to initiate the exchange,
                    and we will work with you to ensure that the new product
                    meets your specific requirements. Our team can also assist
                    with providing technical recommendations if you are unsure
                    of the exact product configuration you need.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>
                  6. International Returns and Exchanges
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    As a global supplier, Automation eCom Global serves
                    customers in Dubai, USA, China, India, Germany, and many
                    other countries. We make international returns and exchanges
                    as seamless as possible by offering clear guidance on
                    customs documentation, international shipping processes, and
                    any additional fees or taxes that may apply.
                  </p>
                  <p className="mt-2">
                    We provide all necessary return shipping labels and customs
                    forms to ensure that your return or exchange is processed
                    without delays. Our logistics team works closely with our
                    global shipping partners to manage cross-border returns
                    efficiently, ensuring that your products are handled with
                    care and arrive back to us in good condition.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>
                  7. Refunds and Processing Times
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Once we receive your returned product and verify its
                    condition, Automation eCom Global will process your refund
                    or exchange immediately. Refunds are typically issued within
                    7-10 business days, depending on your original payment
                    method. You will receive a confirmation email once your
                    refund has been processed.
                  </p>
                  <p className="mt-2">
                    If you are exchanging for a different product, we will ship
                    the replacement product as soon as the original item has
                    been returned and inspected. For items that are in stock,
                    the exchange process is typically completed within 5-7
                    business days.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-8">
                <AccordionTrigger>
                  8. Dedicated Customer Support Throughout the Process
                </AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our customer support team is with you every step of the way,
                    ensuring that your return or exchange is handled
                    professionally and efficiently. Whether you have questions
                    about product eligibility, need help with packaging, or
                    require assistance with international returns, we are here
                    to provide personalized support tailored to your situation.
                  </p>
                  <p className="mt-2">
                    We prioritize your satisfaction and work hard to ensure that
                    you have a positive experience, even if a return or exchange
                    is necessary. Our goal is to make sure that you receive the
                    right products, in the right condition, to keep your
                    operations running smoothly.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Initiate a Return or Exchange</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleInitiateReturn();
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label htmlFor="orderNumber">Order Number</Label>
                  <Input
                    id="orderNumber"
                    placeholder="Enter your order number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Start Return/Exchange Process
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Why Choose Automation eCom Global for Returns and Exchanges?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <ArrowLeftRight className="h-6 w-6 text-primary" />
              <span>Hassle-free process</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-primary" />
              <span>Quick refunds and replacements</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-6 w-6 text-primary" />
              <span>Prepaid return shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-primary" />
              <span>Expert support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary" />
              <span>International return assistance</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
