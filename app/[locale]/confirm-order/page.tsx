"use client";
import Cart from "@/components/Cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetOrder } from "@/features/checkout/use-get-order";
import { CheckCircle, Package, Truck } from "lucide-react";

export default function Component() {
  const { data } = useGetOrder("66d1b7f706c667b9d384b0eb");

  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <div className="w-full max-w-7xl  bg-white rounded-lg shadow-lg overflow-hidden mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="p-8 md:w-1/2">
            <div className="flex justify-start mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">
              Thank you for your purchase!
            </h1>
            <p className="text-gray-600 mb-6">
              {`We'll email you an order confirmation with details and tracking
              info.`}
            </p>
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-2">Order #2023 </h2>
              <p className="text-muted-foreground text-xs">
                May 31, 2023 at 3:42 PM
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <Truck className="mr-2 h-5 w-5" />
                Shipping Information
              </h3>
              <div className="space-y-2">
                <p>
                  {data?.billingAddress.firstName}{" "}
                  {data?.billingAddress.lastName}
                </p>
                <p>{data?.billingAddress.address}</p>
                <p>
                  {data?.billingAddress.city}, {data?.billingAddress.state}{" "}
                  {data?.billingAddress.zipcode}
                </p>
                <p>{data?.billingAddress.country}</p>
              </div>
              <Button className="w-full bg-[#f87171] hover:bg-[#ef4444] text-white">
                View your order
              </Button>
            </div>
          </div>
          <div className="bg-gray-50 p-8 md:w-1/2">
            <Card>
              <CardHeader>
                {/* <CardTitle> */}
                <h3 className="font-semibold mb-2 flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Summary{" "}
                </h3>
                {/* </CardTitle> */}
              </CardHeader>
              <CardContent>
                <Cart />
              </CardContent>
            </Card>
            <div className="mt-4 p-4 bg-green-50 rounded-lg text-green-700 font-medium text-center">
              {`You saved ₹20.00 on this order!`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
