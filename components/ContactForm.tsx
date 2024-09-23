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
  FormMessage,
} from "@/components/ui/form";
import { contactFormSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useCreateCommonEnquiry } from "@/features/enquiry/use-add-common-enquiry";

type FormValues = z.infer<typeof contactFormSchema>;

type Props = {
  t: any; // Adjust this type as needed
};

export const ContactForm = ({ t }: Props) => {
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
        <div className="flex flex-col md:flex-row gap-2">
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="John Doe"
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="example@acme.com"
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
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  type="number"
                  disabled={disabled}
                  placeholder="(123) 456-7890"
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
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder="How can we help you?"
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* Display error message */}
            </FormItem>
          )}
        />

        <Button className="md:w-1/2" disabled={disabled} variant="destructive">
          {disabled ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  );
};
