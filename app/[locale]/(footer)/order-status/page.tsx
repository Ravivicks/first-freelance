"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowRight,
  Package,
  Truck,
  AlertCircle,
  Globe,
  Clock,
  HistoryIcon,
  MessageCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader";

export default function OrderStatus() {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const { locale } = useParams();
  const t = useTranslations("orderStatus");

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
    <div className="container mx-auto md:px-4 px-1 py-8 max-w-6xl">
      <Card className="mb-8 custom-bg">
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t("aboutService")}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="why-choose">Why Choose Us</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>{t("features.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {Object.entries(t.raw("features"))?.map(
                  ([key, item]: [key: string, item: any]) => (
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
              <CardTitle>{t("whyChoose.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {t.raw("whyChoose.items").map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
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
