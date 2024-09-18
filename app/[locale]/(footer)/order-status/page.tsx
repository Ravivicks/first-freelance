"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Package,
  Truck,
  CheckCircle,
  AlertCircle,
  Globe,
  Clock,
  HistoryIcon,
  MessageCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useFetchStaticData } from "@/features/static-data/use-get-data";
import { useStaticDataStore } from "@/stores/useStaticDataStore";

export default function OrderStatus() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const { locale } = useParams();
  useFetchStaticData(locale as string, "os");
  const { data: staticData } = useStaticDataStore();

  const mockOrderStatuses: any = {
    "12345": {
      status: "In Transit",
      eta: "2023-07-15",
      lastUpdate: "Package left Shanghai facility",
    },
    "67890": {
      status: "Delivered",
      eta: "2023-07-10",
      lastUpdate: "Package delivered to recipient",
    },
    "11111": {
      status: "Processing",
      eta: "2023-07-20",
      lastUpdate: "Order confirmed, preparing for shipment",
    },
  };

  const handleTrackOrder = () => {
    setOrderStatus(
      mockOrderStatuses[orderNumber] || {
        status: "Not Found",
        eta: "N/A",
        lastUpdate: "Order not found in our system",
      }
    );
  };

  const iconMap: any = {
    Package: <Package className="h-6 w-6" />,
    AlertCircle: <AlertCircle className="h-6 w-6" />,
    ArrowRight: <ArrowRight className="h-6 w-6" />,
    MessageCircle: <MessageCircle className="h-6 w-6" />,
    Globe: <Globe className="h-6 w-6" />,
    Truck: <Truck className="h-6 w-6" />,
    Clock: <Clock className="h-6 w-6" />,
    HistoryIcon: <HistoryIcon className="h-6 w-6" />,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>
            {staticData
              ? staticData?.orderStatus?.title
              : `About Our Order Status Service`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {staticData
              ? staticData?.orderStatus?.aboutService
              : ` At Automation eCom Global, we understand that staying informed about
            your order's progress is critical to keeping your operations running
            smoothly. That's why we provide a seamless, transparent, and
            user-friendly system to help you stay updated on the status of your
            orders from the moment they are placed to the time they arrive at
            your facility. Our Order Status service is designed to give you
            real-time insights, ensuring that you have all the information you
            need at your fingertips.`}
          </p>
        </CardContent>
      </Card>

      {staticData ? (
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="why-choose">Why Choose Us</TabsTrigger>
          </TabsList>
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Our Order Status Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  {Object.entries(staticData?.orderStatus?.features)?.map(
                    ([key, item]: [key: any, item: any]) => (
                      <OrderStatusFeature
                        key={key}
                        icon={iconMap[item.icon]}
                        title={item.title}
                        description={item.description}
                      />
                    )
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="why-choose">
            <Card>
              <CardHeader>
                <CardTitle>
                  {`Why Choose Automation eCom Global's Order Tracking?`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {
                      staticData?.orderStatus?.features?.realTimeTracking
                        .description
                    }
                  </li>
                  <li>
                    {
                      staticData?.orderStatus?.features?.automatedNotifications
                        .description
                    }
                  </li>
                  <li>
                    {
                      staticData?.orderStatus?.features?.accessViaPortal
                        .description
                    }
                  </li>
                  <li>
                    {
                      staticData?.orderStatus?.features?.orderStatusSupport
                        .description
                    }
                  </li>
                  <li>
                    {
                      staticData?.orderStatus?.features?.deliveryTimeframes
                        .description
                    }
                  </li>
                  <li>
                    {
                      staticData?.orderStatus?.features?.multipleShippingMethods
                        .description
                    }
                  </li>
                  <li>
                    {
                      staticData?.orderStatus?.features?.seamlessCommunication
                        .description
                    }
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="why-choose">Why Choose Us</TabsTrigger>
          </TabsList>
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Our Order Status Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <OrderStatusFeature
                    icon={<Package className="h-6 w-6" />}
                    title="1. Real-Time Tracking"
                    description="From the time you confirm your purchase with Automation eCom Global, our system kicks into action to provide you with real-time tracking of your order. Whether you're purchasing Siemens PLCs, DEIF engine controllers, or any of our wide range of automation products, you'll be able to track the progress of your shipment every step of the way. Once your order has been processed and dispatched, you will receive a tracking number that allows you to monitor the location and estimated arrival time of your package. Our system integrates with global shipping partners to ensure that you receive up-to-date information on your order, including delivery times, delays (if any), and any actions you need to take regarding customs or local regulations."
                  />
                  <OrderStatusFeature
                    icon={<AlertCircle className="h-6 w-6" />}
                    title="2. Automated Notifications"
                    description="We believe in keeping you informed without you having to take extra steps. That's why we offer automated notifications that alert you at key stages of the order process. From order confirmation and shipping updates to delivery notifications, you will receive timely email alerts or SMS messages, depending on your preference. If your order involves multiple items, we provide detailed updates on the status of each product—whether they are being shipped together or separately. This allows you to stay organized and prepared, knowing exactly when each part of your order will arrive."
                  />
                  <OrderStatusFeature
                    icon={<ArrowRight className="h-6 w-6" />}
                    title="3. Access via Customer Account Portal"
                    description="As a valued customer of Automation eCom Global, you have access to our Customer Account Portal, a secure, personalized platform where you can manage and track all your orders. By logging into your account, you'll be able to view your entire order history, check the current status of active orders, and access invoice details. Within the portal, you can easily retrieve details such as: Order number, Product descriptions, Shipment tracking information, Estimated delivery dates. In addition, our platform allows you to download order-related documents like invoices and shipping confirmations, providing you with everything you need to manage your business logistics efficiently."
                  />
                  <OrderStatusFeature
                    icon={<MessageCircle className="h-6 w-6" />}
                    title="4. Order Status Support"
                    description="Should you have any questions or concerns about your order, our dedicated Customer Support Team is here to help. We understand that sometimes orders need to be expedited or adjustments may be necessary due to operational changes. Whether you're checking on the status of a time-sensitive shipment or inquiring about potential delays, our support team will provide prompt, accurate updates to ensure you have complete visibility of your order. We also offer personalized support for large or custom orders. If your purchase involves specialized configurations—such as custom-built control panels or integrated systems—our team will provide detailed tracking and frequent updates to ensure that you are informed at every stage of production and delivery."
                  />
                  <OrderStatusFeature
                    icon={<Globe className="h-6 w-6" />}
                    title="5. Delivery Timeframes and Global Reach"
                    description="At Automation eCom Global, we pride ourselves on delivering automation products to clients around the globe. Our shipping partners are carefully selected to provide fast, reliable service across a range of international markets, including Dubai, USA, China, India, Germany, and beyond. We provide estimated delivery times based on your location and the complexity of the order. If your shipment requires customs clearance or involves large-scale logistics, we will keep you updated on potential delays and work to ensure the smoothest possible delivery. For large projects or urgent orders, we offer priority shipping options to ensure you receive your products in the fastest time possible, so your business operations remain uninterrupted. Our team also assists with all customs documentation and international shipping regulations to minimize any potential delays."
                  />
                  <OrderStatusFeature
                    icon={<Truck className="h-6 w-6" />}
                    title="6. Multiple Shipping Methods"
                    description="To accommodate the unique needs of our diverse clientele, Automation eCom Global offers a variety of shipping methods. Whether you need express delivery for critical automation parts or are scheduling bulk shipments for an ongoing project, we provide flexible shipping options that match your business needs. From standard shipping to expedited air freight, we offer customized solutions that prioritize speed, security, and cost-efficiency. All shipping methods come with full tracking capabilities, so you can stay informed no matter which option you choose."
                  />
                  <OrderStatusFeature
                    icon={<Clock className="h-6 w-6" />}
                    title="7. Seamless Communication and Updates"
                    description="In the event of unexpected delays or changes to your order's delivery schedule, Automation eCom Global is committed to keeping the lines of communication open. We provide regular updates via email, SMS, or within your Customer Account Portal, ensuring that any changes to your order status are communicated in real-time. For large or mission-critical orders, our team proactively monitors the shipping process and will reach out if there are any foreseeable issues. Our goal is to mitigate any potential disruption to your supply chain by keeping you informed and offering solutions wherever possible."
                  />
                  <OrderStatusFeature
                    icon={<HistoryIcon className="h-6 w-6" />}
                    title="8. Historical Order Data & Reorders"
                    description="One of the many benefits of tracking your orders through our system is the ability to access historical order data at any time. Whether you need to reorder a particular product or review previous shipments for accounting purposes, your Automation eCom Global customer account stores all the relevant data for your convenience. You can easily view past orders, reorder products, and check delivery timelines to ensure your inventory is stocked appropriately. Our system makes it simple to reorder frequently purchased items, helping you save time while maintaining a steady supply of essential automation components."
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="why-choose">
            <Card>
              <CardHeader>
                <CardTitle>
                  {`Why Choose Automation eCom Global's Order Tracking?`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    {`Real-time tracking: Stay updated on your order's progress with
                  accurate, live tracking.`}
                  </li>
                  <li>
                    Automated notifications: Receive email or SMS alerts for
                    every important stage of your order.
                  </li>
                  <li>
                    Comprehensive customer portal: Manage your orders, view
                    history, and track shipments from a single platform.
                  </li>
                  <li>
                    Global delivery: We ship worldwide with reliable, fast
                    delivery times.
                  </li>
                  <li>
                    Personalized support: Our customer service team is always
                    ready to assist with tracking and updates.
                  </li>
                  <li>
                    Flexible shipping methods: Choose the delivery option that
                    best suits your timeline and budget.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

function OrderStatusFeature({
  icon,
  title,
  description,
}: {
  icon: any;
  title: any;
  description: any;
}) {
  return (
    <div className="flex items-start space-x-4 mb-6">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
