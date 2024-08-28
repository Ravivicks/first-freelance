"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, Package, Plus, Check, Trash2Icon } from "lucide-react";
import Image from "next/image";
import useFromStore from "@/hooks/useFromStore";
import { useCartStore } from "@/stores/useCartStore";
import { calculateTotalWithGSTAndShipping } from "@/lib/utils";

const savedAddresses = [
  {
    id: 1,
    name: "John Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
  },
  {
    id: 2,
    name: "Jane Smith",
    address: "456 Elm St",
    city: "Los Angeles",
    state: "CA",
    zip: "90001",
  },
];

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const cart = useFromStore(useCartStore, (state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  let total = 0;
  if (cart) {
    total = cart.reduce(
      (acc, product) => acc + product.lowestPrice * (cart.length as number),
      0
    );
  }
  const { gstAmount, shippingAmount, totalWithGSTAndShipping } =
    calculateTotalWithGSTAndShipping(total);
  const handleAddressSelect = (id: number) => {
    setSelectedAddress(id);
  };

  const handleAddNewAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you would typically save the new address to your backend
    // For now, we'll just close the dialog
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex gap-4">
        <div className="flex-auto">
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {savedAddresses.map((address) => (
                    <Card
                      key={address.id}
                      className={`cursor-pointer transition-colors ${
                        selectedAddress === address.id
                          ? "border-primary"
                          : "hover:border-primary"
                      }`}
                      onClick={() => handleAddressSelect(address.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{address.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {address.address}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {address.city}, {address.state} {address.zip}
                            </p>
                          </div>
                          {selectedAddress === address.id && (
                            <Check className="text-primary h-5 w-5" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer transition-colors hover:border-primary">
                        <CardContent className="p-4 text-center">
                          <Plus className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium">Add new address</p>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                      </DialogHeader>
                      <form
                        onSubmit={handleAddNewAddress}
                        className="grid gap-4 py-4"
                      >
                        <div className="grid gap-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" placeholder="123 Main St" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="New York" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="state">State</Label>
                            <Select>
                              <SelectTrigger id="state">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ny">New York</SelectItem>
                                <SelectItem value="ca">California</SelectItem>
                                <SelectItem value="tx">Texas</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="zip">ZIP Code</Label>
                            <Input id="zip" placeholder="12345" />
                          </div>
                        </div>
                        <Button type="submit">Save Address</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Your Basket</CardTitle>
              </CardHeader>
              <CardContent>
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
            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label
                      htmlFor="credit-card"
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
                {paymentMethod === "credit-card" && (
                  <div className="mt-4 grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button className="w-full">Place Order</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="flex-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span> ${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST</span>
                  <span>${gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shippingAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalWithGSTAndShipping.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
