"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, ShoppingBag } from "lucide-react";
import { useGetUser } from "@/features/user/use-single-user";
import { useUser } from "@clerk/nextjs";
import { UserForm } from "@/components/UserForm";
import { useUpdateUser } from "@/features/user/use-update-user";
import { userFormSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { useGetOrders } from "@/features/checkout/use-get-orders";

type FormValues = z.input<typeof userFormSchema>;

export default function UserAccount() {
  const { user } = useUser();
  const emailId = user?.emailAddresses?.[0]?.emailAddress;
  const [activeTab, setActiveTab] = useState("profile");
  const { data, isLoading } = useGetUser(emailId as string);
  const { data: orders } = useGetOrders(emailId as string);
  const updateMution = useUpdateUser();

  const defaultValue = {
    firstName: data?.firstName || "",
    lastName: data?.lastName || "",
    email: data?.email || "",
    phone: data?.phone || "",
  };

  const onSubmit = (values: FormValues) => {
    updateMution.mutate({ updates: values });
  };
  return (
    <div className="container mx-auto px-4 py-8 my-6 rounded-md bg-gradient-to-r from-slate-100 to-destructive/10">
      <div className="flex flex-col md:flex-row items-center md:items-center mb-8 gap-4 bg-white p-8 rounded-md ">
        <Avatar className="w-24 h-24">
          <AvatarImage
            src="/placeholder.svg?height=96&width=96"
            alt="User Avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">
            {data?.firstName} {data?.lastName}
          </h1>
          <p className="text-muted-foreground">{data?.email}</p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <UserCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Orders</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <UserForm onSubmit={onSubmit} defaultValues={defaultValue} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders?.map((order, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{order.orderId}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.createdAt}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{order.totalAmount}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            {/* <CardFooter>
              <Button variant="outline">View All Orders</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
