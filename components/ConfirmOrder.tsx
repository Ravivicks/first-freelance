import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Package, Truck } from "lucide-react";
import Link from "next/link";

export default function ConfirmOrder() {
  const orderDetails = {
    orderNumber: "ORD-12345-ABCDE",
    orderDate: "June 15, 2023",
    total: "$249.98",
    shipping: {
      name: "John Doe",
      address: "123 Main St, Anytown, ST 12345",
      method: "Standard Shipping (3-5 business days)",
    },
    items: [
      { name: "Wireless Earbuds", price: "$129.99", quantity: 1 },
      { name: "Phone Case", price: "$19.99", quantity: 2 },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">Order Confirmed</CardTitle>
          <p className="text-muted-foreground">Thank you for your purchase!</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Order Number</p>
              <p className="text-muted-foreground">
                {orderDetails.orderNumber}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold">Order Date</p>
              <p className="text-muted-foreground">{orderDetails.orderDate}</p>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Truck className="mr-2 h-5 w-5" />
              Shipping Information
            </h3>
            <p>{orderDetails.shipping.name}</p>
            <p>{orderDetails.shipping.address}</p>
            <p className="text-muted-foreground mt-2">
              {orderDetails.shipping.method}
            </p>
          </div>
          <Separator />
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Order Summary
            </h3>
            <ul className="space-y-2">
              {orderDetails.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{orderDetails.total}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/">
            <Button>Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
