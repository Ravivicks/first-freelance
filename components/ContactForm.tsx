import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, // Import FormMessage for error display
} from "@/components/ui/form";
import { contactFormSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { useCreateCommonEnquiry } from "@/features/enquiry/use-add-common-enquiry";

type FormValues = z.input<typeof contactFormSchema>;

type Props = {
  staticData: any;
};

const defaultValues = {
  fullName: "",
  email: "",
  mobile: "",
  productId: "",
  productName: "",
  productPrice: 0,
  enquiryDescription: "",
  quantity: 1,
  status: "pending",
  enquiryType: "contactQuery",
  reason: "",
  cartProduct: [],
};
export const ContactForm = ({ staticData }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      productId: "",
      productName: "",
      productPrice: 0,
      enquiryDescription: "",
      quantity: 1,
      status: "pending",
      enquiryType: "contactQuery",
      reason: "",
      cartProduct: [],
    },
  });

  const mutation = useCreateCommonEnquiry();

  const disabled = mutation.isPending || false;

  const handleSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        form.reset({
          fullName: "",
          email: "",
          mobile: "",
          enquiryDescription: "",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="scrollable-form space-y-4 pt-4 px-2 max-h-[80vh] overflow-auto"
      >
        <div className="flex gap-2">
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {staticData
                    ? staticData?.contact?.form?.fields?.name?.label
                    : "Name"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={
                      staticData
                        ? staticData?.contact?.form?.fields?.name?.placeholder
                        : "John Doe"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  {staticData
                    ? staticData?.contact?.form?.fields?.email?.label
                    : "Email"}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={
                      staticData
                        ? staticData?.contact?.form?.fields?.email?.placeholder
                        : "example@acme.com"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="mobile"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                {staticData
                  ? staticData?.contact?.form?.fields?.phone?.label
                  : "Phone"}{" "}
              </FormLabel>
              <FormControl>
                <Input
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  disabled={disabled}
                  placeholder={
                    staticData
                      ? staticData?.contact?.form?.fields?.phone?.placeholder
                      : "(123) 456-7890"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* Display error message */}
            </FormItem>
          )}
        />

        <FormField
          name="enquiryDescription"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>
                  {staticData
                    ? staticData?.contact?.form?.fields?.message?.label
                    : "Message"}
                </FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disabled}
                    placeholder={
                      staticData
                        ? staticData?.contact?.form?.fields?.message
                            ?.placeholder
                        : "How can we help you?"
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            );
          }}
        />

        <Button className="md:w-1/2" disabled={disabled} variant="destructive">
          {disabled
            ? "Sending..."
            : staticData
            ? staticData?.contact?.form?.submitButton
            : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};
