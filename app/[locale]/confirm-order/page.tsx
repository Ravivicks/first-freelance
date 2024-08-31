"use client";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { CheckCircle, Package, Truck } from "lucide-react";
// import Link from "next/link";

// export default function ConfirmOrder() {
//   const orderDetails = {
//     orderNumber: "ORD-12345-ABCDE",
//     orderDate: "June 15, 2023",
//     total: "$249.98",
//     shipping: {
//       name: "John Doe",
//       address: "123 Main St, Anytown, ST 12345",
//       method: "Standard Shipping (3-5 business days)",
//     },
//     items: [
//       { name: "Wireless Earbuds", price: "$129.99", quantity: 1 },
//       { name: "Phone Case", price: "$19.99", quantity: 2 },
//     ],
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Card className="max-w-3xl mx-auto">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <CheckCircle className="h-12 w-12 text-green-500" />
//           </div>
//           <CardTitle className="text-2xl font-bold">Order Confirmed</CardTitle>
//           <p className="text-muted-foreground">Thank you for your purchase!</p>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="flex justify-between items-center">
//             <div>
//               <p className="font-semibold">Order Number</p>
//               <p className="text-muted-foreground">
//                 {orderDetails.orderNumber}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="font-semibold">Order Date</p>
//               <p className="text-muted-foreground">{orderDetails.orderDate}</p>
//             </div>
//           </div>
//           <Separator />
//           <div>
//             <h3 className="font-semibold mb-2 flex items-center">
//               <Truck className="mr-2 h-5 w-5" />
//               Shipping Information
//             </h3>
//             <p>{orderDetails.shipping.name}</p>
//             <p>{orderDetails.shipping.address}</p>
//             <p className="text-muted-foreground mt-2">
//               {orderDetails.shipping.method}
//             </p>
//           </div>
//           <Separator />
//           <div>
//             <h3 className="font-semibold mb-2 flex items-center">
//               <Package className="mr-2 h-5 w-5" />
//               Order Summary
//             </h3>
//             <ul className="space-y-2">
//               {orderDetails.items.map((item, index) => (
//                 <li key={index} className="flex justify-between">
//                   <span>
//                     {item.name} x {item.quantity}
//                   </span>
//                   <span>{item.price}</span>
//                 </li>
//               ))}
//             </ul>
//             <Separator className="my-4" />
//             <div className="flex justify-between font-semibold">
//               <span>Total</span>
//               <span>{orderDetails.total}</span>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <Link href="/">
//             <Button>Continue Shopping</Button>
//           </Link>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetOrder } from "@/features/checkout/use-get-order";
import { formatNumber } from "@/lib/utils";
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
                <div className="space-y-4">
                  {data?.items.map((item) => (
                    <div className="flex justify-between items-center">
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
  );
}
