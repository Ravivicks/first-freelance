"use client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrder } from "@/features/checkout/use-get-order";
import { formatNumber } from "@/lib/utils";
import { useProductsStore } from "@/stores/useProductStore";
import { CheckCircle, Package, Truck } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Component() {
  const param = useSearchParams();
  const orderId = param.get("order");

  const { data } = useGetOrder(orderId as string);
  const {
    products,
    isLoading: isProductLoading,
    fetchData,
  } = useProductsStore();
  const key = "product-by-id";

  useEffect(() => {
    fetchData(key, 1, 20);
  }, [fetchData]);

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden my-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-100 to-destructive/10 py-4 px-4">
            Order Confirmation
          </h1>
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
                <h2 className="text-sm font-semibold mb-2">
                  Order-id: {data?.orderId}
                </h2>
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
                  <div className="space-y-4">
                    {data?.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              Qty - {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">
                          ₹{formatNumber(item.price)}
                        </p>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>₹{formatNumber(data?.totalAmount)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Shipping</p>
                        <p>₹0.00</p>
                      </div>
                      <div className="flex justify-between font-semibold text-lg mt-4">
                        <p>Total</p>
                        <p>₹{formatNumber(data?.totalAmount)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4 p-4 bg-green-50 rounded-lg text-green-700 font-medium text-center">
                {`You saved ₹20.00 on this order!`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl md:text-2xl font-bold">Similar Products</h1>
          <p className="text-sm text-gray-500 cursor-pointer">
            Feedback | See all
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mb-10">
          {products[key]?.map((product, index) => (
            <div
              className="flex-none flex-grow w-full sm:w-1/2 md:w-1/3 lg:w-1/5"
              key={index}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
