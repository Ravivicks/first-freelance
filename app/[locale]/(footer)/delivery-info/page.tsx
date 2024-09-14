"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Truck,
  Clock,
  Package,
  Bell,
  FileText,
  MapPin,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

export default function DeliveryInformation() {
  const [activeFeature, setActiveFeature] = useState("1");

  const features = [
    {
      id: "1",
      title: "Global Delivery Network",
      icon: <Globe className="h-6 w-6" />,
    },
    { id: "2", title: "Delivery Options", icon: <Truck className="h-6 w-6" /> },
    {
      id: "3",
      title: "Fast and Reliable Delivery Times",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      id: "4",
      title: "Secure Packaging and Handling",
      icon: <Package className="h-6 w-6" />,
    },
    {
      id: "5",
      title: "Shipment Tracking and Notifications",
      icon: <Bell className="h-6 w-6" />,
    },
    {
      id: "6",
      title: "Customs and International Shipping Support",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "7",
      title: "Delivery to Remote Locations",
      icon: <MapPin className="h-6 w-6" />,
    },
    {
      id: "8",
      title: "Easy Returns and Exchanges",
      icon: <RefreshCw className="h-6 w-6" />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>About Our Delivery Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {`At Automation eCom Global, we recognize that timely and reliable
            delivery is crucial to your business operations. Whether you're
            purchasing Siemens PLCs, DEIF engine controllers, Schneider HMIs, or
            other industrial automation products, we ensure that your orders
            reach you quickly, safely, and with complete transparency. Our
            Delivery Information services are designed to give you confidence
            and control over your shipments, with flexible options tailored to
            meet your specific needs.`}
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Delivery Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {features.map((feature) => (
                <Button
                  key={feature.id}
                  variant={activeFeature === feature.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {features.find((f) => f.id === activeFeature)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeFeature === "1" && (
              <p>
                {`As a global leader in industrial automation, Automation eCom
                Global provides reliable delivery services across a wide range
                of international markets, including Dubai, USA, China, India,
                Germany, and more. Our extensive network of trusted shipping
                partners allows us to deliver orders to customers worldwide,
                ensuring that you receive your products on time, no matter where
                you are located. We understand that industrial automation
                products are often critical to the smooth operation of your
                business. That's why we work with some of the best logistics
                providers in the world to ensure that our shipments are fast,
                secure, and carefully handled. From small orders to large,
                complex shipments, we provide delivery solutions that match your
                operational timelines and minimize downtime.`}
              </p>
            )}
            {activeFeature === "2" && (
              <p>
                {`At Automation eCom Global, we offer a variety of shipping
                options to accommodate the diverse needs of our customers.
                Whether you need standard delivery, express shipping, or freight
                services for large, heavy items, we provide flexible solutions
                that ensure your products arrive safely and on time. Our
                delivery options include: Standard Delivery: A cost-effective
                shipping option for orders that are not time-sensitive but still
                require reliable, secure delivery. Express Delivery: For urgent
                orders that need to be fulfilled quickly, we offer express
                delivery services that prioritize speed without compromising
                security. Freight and Bulk Shipping: For large or heavy
                industrial automation equipment, such as control panels, VFDs,
                or large drives, we offer specialized freight services that
                ensure safe transport, with proper handling and packaging. We
                tailor each delivery method to your specific order size, weight,
                and location, ensuring that you receive the best combination of
                cost-efficiency and timely delivery.`}
              </p>
            )}
            {activeFeature === "3" && (
              <p>
                {`We understand that time is of the essence when it comes to
                industrial automation. Automation eCom Global is committed to
                providing accurate estimated delivery times so you can plan
                accordingly. Whether you are located in a bustling city or a
                remote industrial area, we ensure that our shipping partners
                deliver within the promised timeframes. Our standard delivery
                typically arrives within 5-10 business days for most
                international destinations, while express deliveries can be
                expected within 2-5 business days, depending on your location.
                For complex shipments or bulk orders, we work with you to
                provide custom delivery timelines that meet your project
                requirements. We also ensure that any customs clearance
                processes are handled efficiently, minimizing delays and
                ensuring a smooth cross-border transaction. Our logistics team
                is experienced in navigating international shipping regulations,
                so you can be confident that your products will arrive without
                unnecessary delays.`}
              </p>
            )}
            {activeFeature === "4" && (
              <p>
                {` At Automation eCom Global, we take great care in ensuring that
                your automation products are securely packaged and safely
                transported. We use industry-approved packaging materials that
                protect sensitive equipment like PLCs, HMIs, drives, and
                controllers from damage during transit. For larger, more complex
                shipments such as control panels or fragile components, we
                provide specialized packaging solutions that include: Padded,
                impact-resistant packaging, Moisture protection, Heavy-duty
                pallets for bulk or heavy orders. Our attention to detail in
                packaging ensures that every product you receive is in perfect
                working condition, allowing you to integrate it into your
                systems without any concerns.`}
              </p>
            )}
            {activeFeature === "5" && (
              <p>
                {`From the moment your order is dispatched, you will have full
                visibility and control over the shipment. Automation eCom Global
                provides a comprehensive tracking system that allows you to
                monitor your order in real-time, from our warehouse to your
                location. You will receive a tracking number as soon as your
                products are shipped, and you can check the delivery progress at
                any time through our website or customer portal. We also provide
                automated notifications at key stages of the shipping process,
                including: Order confirmation, Dispatch notification, Shipment
                tracking updates, Delivery confirmation. These notifications
                keep you informed about your order status and allow you to plan
                your operations accordingly.`}
              </p>
            )}
            {activeFeature === "6" && (
              <p>
                {`As a global supplier, Automation eCom Global understands the
                complexities of international shipping, particularly when it
                comes to customs regulations. We provide comprehensive customs
                support to ensure that your products clear customs smoothly and
                without unnecessary delays. We handle all the necessary
                documentation for international shipments, including: Commercial
                invoices, Packing lists, Certificates of origin, Customs
                declarations. Our logistics team works closely with customs
                authorities to resolve any potential issues, ensuring that your
                shipment arrives on time without any unexpected charges or
                delays.`}
              </p>
            )}
            {activeFeature === "7" && (
              <p>
                {`At Automation eCom Global, we understand that industrial
                operations are often located in remote or hard-to-reach areas.
                Whether you're operating a manufacturing facility in a rural
                area or a power plant in a remote location, we provide
                specialized delivery services to ensure your products reach you,
                no matter where you are. We collaborate with local shipping
                providers who specialize in remote deliveries, ensuring that
                your critical automation products are transported safely and
                securely, even to challenging locations.`}
              </p>
            )}
            {activeFeature === "8" && (
              <p>
                {`While we strive to ensure that every order is fulfilled
                perfectly, we understand that occasionally returns or exchanges
                may be necessary. At Automation eCom Global, we offer a
                hassle-free returns process to address any issues with your
                order, whether due to product defects, incorrect shipments, or
                other concerns. Simply contact our customer support team, and we
                will guide you through the returns or exchange process. We
                provide prepaid return labels for eligible returns and will
                arrange for quick replacements or refunds as needed.`}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>
            Why Choose Automation eCom Global for Your Delivery Needs?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Global reach</AccordionTrigger>
              <AccordionContent>
                We deliver to customers around the world, with fast and reliable
                shipping options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Flexible delivery methods</AccordionTrigger>
              <AccordionContent>
                Choose from standard, express, or freight shipping to meet your
                needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Secure packaging</AccordionTrigger>
              <AccordionContent>
                We ensure your products are safely packaged and protected during
                transit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Real-time tracking</AccordionTrigger>
              <AccordionContent>
                Stay informed with real-time shipment updates and notifications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Customs support</AccordionTrigger>
              <AccordionContent>
                We handle all international shipping regulations and paperwork
                for a smooth delivery experience.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Reliable delivery to remote locations
              </AccordionTrigger>
              <AccordionContent>
                We cater to even the most remote industrial sites with
                specialized delivery services.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
