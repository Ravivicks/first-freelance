import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { checkout } from "@/lib/actions/checkout";
import { IRazorOption } from "@/types";

export const useCreateCheckout = () => {
  const mutation = useMutation({
    mutationFn: async (options: IRazorOption) => {
      const response = await checkout(options);
      console.log(response);

      return response; // Return the order details from your API
    },
    onSuccess: async (data) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay Key ID from environment variables
        amount: data.amount, // Amount in paise
        currency: data.currency, // Currency
        name: "Your Company Name", // Your company name
        description: "Order Description", // Order description
        order_id: data.id, // The order ID returned by your API
        handler: function (response: any) {
          // Handle successful payment here
          toast.success("Payment successful!");
          console.log("Payment Response:", response);
        },
        prefill: {
          name: "Customer Name", // Optional pre-fill details
          email: "customer@example.com", // Optional pre-fill details
          contact: "9999999999", // Optional pre-fill details
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    },
    onError: () => {
      toast.error("Failed to place an order");
    },
  });
  return mutation;
};
