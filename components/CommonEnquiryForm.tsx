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
type EnquiryType =
  | "cart"
  | "priceRequest"
  | "quickQuote"
  | "quoteRequest"
  | "serviceQuote"
  | "entireProjectQuote";

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
  type?: EnquiryType; // Add enquiry type
  t?: any;
};

export const CommonEnquiryForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
  type, // Use the type prop
  t,
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
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>{t("fullNameLabel")}</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder={t("fullNamePlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage /> {/* Display error message */}
            </FormItem>
          )}
        />
        {/* Email Field */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder={t("emailPlaceholder")}
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
                <FormLabel>{t("mobileLabel")}</FormLabel>
                <FormControl>
                  <Input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    disabled={disabled}
                    placeholder={"(123) 456-7890"}
                    {...field}
                  />
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
                  <FormLabel>{t("quantityLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder={t("quantityPlaceholder")}
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
              <FormLabel>{t("enquiryDescriptionLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  disabled={disabled}
                  placeholder={t("enquiryDescriptionPlaceholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button className="w-full" disabled={disabled} variant="destructive">
          {disabled ? t("submittingButton") : t("submitButton")}
        </Button>
      </form>
    </Form>
  );
};
