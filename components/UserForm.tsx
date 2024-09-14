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
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Please enter your first name"
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
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="Please enter your last name"
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
                <FormLabel>Mobile </FormLabel>
                <FormControl>
                  <Input
                    // readOnly={!field.value}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    disabled={disabled}
                    placeholder="Please enter your Mobile number"
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
                    readOnly
                    disabled={disabled}
                    placeholder="Please enter your email address"
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
          {disabled ? "Saving..." : "Save Address"}
        </Button>
      </form>
    </Form>
  );
};
