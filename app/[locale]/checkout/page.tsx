"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MapPin, ShoppingBag, Plus, Check, Trash2Icon } from "lucide-react";
import { useAddressOpen } from "@/hooks/use-address-open";
import { calculateTotalWithGSTAndShipping, cn } from "@/lib/utils";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import Image from "next/image";
import { useGetAddresses } from "@/features/address/use-get-addresses";
import { IAddress } from "@/types";
import { useGetAddress } from "@/features/address/use-get-address";

export default function Component() {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const emailId = sessionStorage.getItem("email") || "";
  const [addressData, setAddressData] = useState<IAddress>();

  const { data, refetch } = useGetAddresses(emailId || "");
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

  const { onOpen, id, isOpen } = useAddressOpen();
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (cart.length as number),
      0
    );
  }

  const {
    gstAmount,
    shippingAmount,
    totalWithGSTAndShipping,
    discountAmount,
    discountedAmount,
  } = calculateTotalWithGSTAndShipping(total);

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
                          className="text-blue-500"
                          onClick={() => onOpen(String(item?._id))}
                        >
                          Edit
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
              <div>
                {cart?.map((cartItem, index) => (
                  <div key={index}>
                    <div className="flex justify-between my-3">
                      <div className="flex items-center gap-2">
                        <Image
                          src={cartItem.image}
                          alt={`item - ${index}`}
                          height={50}
                          width={50}
                          className="rounded-xl"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="font-semibold text-xs">
                            {cartItem.title}
                          </p>
                          <p className="font-semibold text-xs text-muted-foreground">
                            {cartItem.currency}
                            {cartItem.lowestPrice}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => removeFromCart(cartItem)}
                        className="rounded-full"
                      >
                        <Trash2Icon className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Details */}
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Details</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹ {gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery charges</span>
                  <span>₹ {shippingAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount price</span>
                  <span>₹{discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span>₹ {totalWithGSTAndShipping.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500">(Incl. of all taxes)</p>
              </div>
              <div className="mt-4 p-2 bg-green-100 rounded-md">
                <p className="text-sm text-green-800">
                  Your total Savings amount on this order
                </p>
                <p className="text-lg font-bold text-green-00">
                  ₹ {discountAmount.toFixed(2)}
                </p>
              </div>
              <Button className="w-full mt-4" variant="destructive">
                CheckOut
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
