"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, ShoppingBag, Plus, Check, Edit2 } from "lucide-react";
import { useAddressOpen } from "@/hooks/use-address-open";
import {
  calculateTotalWithGSTAndShipping,
  cn,
  formatNumber,
} from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { useGetAddresses } from "@/features/address/use-get-addresses";
import { IAddress } from "@/types";
import { useGetAddress } from "@/features/address/use-get-address";
import { useCheckoutOpen } from "@/hooks/use-checkout-open";
import { useUser } from "@clerk/nextjs";
import Cart from "@/components/Cart";
import PaymentAndShipping from "@/components/PaymentAndShipping";

export default function Component() {
  const { user } = useUser();
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const emailId = user ? user?.emailAddresses?.[0]?.emailAddress : "";
  const [addressData, setAddressData] = useState<IAddress>();
  const userEmail = sessionStorage.getItem("email");

  const { data, refetch } = useGetAddresses(emailId || (userEmail as string));
  const { data: address } = useGetAddress(selectedAddress as string);

  const handleAddressSelect = (id: string) => {
    if (selectedAddress === id) {
      // Deselect the address if it's already selected
      setSelectedAddress(null);
      setAddressData(undefined); // Clear address data
    } else {
      // Select the address
      setSelectedAddress(id);
    }
  };

  useEffect(() => {
    if (address) {
      setAddressData(address as IAddress);
      refetch();
    }
  }, [address]);

  const { onOpen, isOpen } = useAddressOpen();

  const { cart } = useCartStore();
  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (product.quantity || 1),
      0
    );
  }

  useEffect(() => {
    if (!isOpen) {
      refetch(); // Refetch addresses when the popup is closed
    }
  }, [isOpen, refetch]);
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">{`You're almost there...!`}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Address */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-slate-100 to-destructive/10 py-4">
              <div className="flex items-center gap-2 ">
                <MapPin className="text-destructive" />
                <h2 className="text-lg font-semibold ">Delivery address</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {data && data?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data?.map((item) => (
                    <Card
                      key={item._id}
                      className={`cursor-pointer transition-colors p-3 ${
                        selectedAddress === item._id
                          ? "border-destructive"
                          : "hover:border-primary"
                      }`}
                    >
                      {selectedAddress === item._id && (
                        <Check className="text-primary h-6 w-6 bg-destructive rounded-full p-1 text-white relative -top-6 -left-4" />
                      )}
                      <div
                        className={cn(
                          "flex justify-between items-start",
                          selectedAddress === item._id && "-mt-6"
                        )}
                      >
                        <div onClick={() => handleAddressSelect(item._id)}>
                          <h3 className="font-bold">
                            {item.firstName} {item.lastName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.address}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.city}, {item.state} - {item.zipcode}
                          </p>
                          <p className="text-sm text-gray-600">
                            Mobile No.: {item.phone}
                          </p>
                        </div>

                        <Button
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => onOpen(String(item?._id))}
                        >
                          <Edit2 className="size-3.5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 p-3 rounded-md text-green-800">
                  <h1 className="font-semibold">
                    {`You don't have any saved delivery address.`}
                  </h1>
                  <p className="text-xs">
                    {`Don't worry you can add new address with clicking`}
                    <span className="font-bold"> Add Address </span> button and
                    continue to checkout.
                  </p>
                  <p className="text-xs">
                    If you already have an account please login so we can fecth
                    your address from you profile
                  </p>
                </div>
              )}
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => onOpen("")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Address
              </Button>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-slate-100 to-destructive/10 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-destructive" />
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Cart />
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div>
          <PaymentAndShipping
            total={total}
            addressData={addressData as IAddress}
          />
          {/* <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Payment & Shipping Details
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹{formatNumber(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹ {formatNumber(gstAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery charges</span>
                  <span>₹ {formatNumber(shippingAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount price</span>
                  <span>₹{formatNumber(discountAmount)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>₹ {formatNumber(totalWithGSTAndShipping)}</span>
                </div>
                <p className="text-xs text-gray-500">(Incl. of all taxes)</p>
              </div>
              <div className="mt-4 p-2 bg-green-100 rounded-md">
                <p className="text-sm text-green-800">
                  Your total Savings amount on this order
                </p>
                <p className="text-lg font-bold text-green-00">
                  ₹ {formatNumber(discountAmount)}
                </p>
              </div>
              <Button
                className="w-full mt-4"
                variant="destructive"
                onClick={() => onCheckoutOpen(addressData?._id as string)}
                disabled={cart.length === 0 || addressData === undefined}
              >
                CheckOut
              </Button>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
