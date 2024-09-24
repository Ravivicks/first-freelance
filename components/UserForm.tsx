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
import { userFormSchema } from "@/lib/zod-schema";
import { z } from "zod";
import { useTranslations } from "next-intl"; // Import the useTranslations hook

type FormValues = z.input<typeof userFormSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const UserForm = ({ onSubmit, defaultValues, disabled }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const t = useTranslations("userForm"); // Specify the namespace

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="scrollable-form space-y-4 pt-4 px-2 max-h-[80vh] overflow-auto"
      >
        <div className="flex gap-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={t("placeholderFirstName")} // Use translation
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={t("placeholderLastName")} // Use translation
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("mobile")}</FormLabel>
                <FormControl>
                  <Input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    disabled={disabled}
                    placeholder={t("placeholderMobile")} // Use translation
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
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    readOnly
                    disabled={disabled}
                    placeholder={t("placeholderEmail")} // Use translation
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full md:w-1/4"
          disabled={disabled}
          variant="destructive"
        >
          {disabled ? t("savingButton") : t("saveButton")}{" "}
          {/* Use translation */}
        </Button>
      </form>
    </Form>
  );
};
