import { z } from "zod";
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
import { commonEnquiryFormSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "./PhoneInput";

type FormValues = z.input<typeof commonEnquiryFormSchema>;
type EnquiryType = "cart" | "priceRequest" | "quickQuote" | "quoteRequest"; // Define your types

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
  type?: EnquiryType; // Add enquiry type
};

export const CommonEnquiryForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  type, // Use the type prop
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(commonEnquiryFormSchema),
    defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        {/* Email Field */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional Rendering for "priceRequest" */}
        <div className="flex gap-2 w-full">
          <FormField
            name="mobile"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mobile</FormLabel>
                <FormControl>
                  <PhoneInput className="rounded-xl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {type === "priceRequest" && (
            <FormField
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-xl"
                      disabled={disabled}
                      placeholder="Please provide quantity"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value)); // Allow empty string, convert to number otherwise
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        {/* Enquiry Description */}
        <FormField
          name="enquiryDescription"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enquiry Description</FormLabel>
              <FormControl>
                <Textarea
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter Detail description of your enquiry"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          className="w-full rounded-xl"
          disabled={disabled}
          variant="destructive"
        >
          {disabled ? "Submitting..." : "Submit your request"}
        </Button>
      </form>
    </Form>
  );
};
