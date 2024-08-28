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
import { formAddressSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import countryList from "@/lib/countries.json";
import { useEffect, useState } from "react";
import { z } from "zod";

type FormValues = z.input<typeof formAddressSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const AddressForm = ({ onSubmit, defaultValues, disabled }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formAddressSchema),
    defaultValues: defaultValues,
  });

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availableStates, setAvailableStates] = useState<
    { code: string; name: string }[]
  >([]);

  useEffect(() => {
    if (selectedCountry) {
      const country = countryList.find(
        (country) => country.name === selectedCountry
      );
      if (country) {
        setAvailableStates(country.states);
      } else {
        setAvailableStates([]);
      }
    } else {
      setAvailableStates([]);
    }
  }, [selectedCountry]);

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
        <FormField
          name="address"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disabled}
                    placeholder="Please enter complete address"
                    {...field}
                  />
                </FormControl>
                <FormMessage /> {/* Display error message */}
              </FormItem>
            );
          }}
        />
        <div className="flex gap-2">
          <FormField
            name="country"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCountry(value);
                      }}
                      value={field.value}
                      disabled={disabled}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countryList.map((country, index) => (
                          <SelectItem key={index} value={country.name}>
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage /> {/* Display error message */}
                </FormItem>
              );
            }}
          />
          <FormField
            name="state"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    {availableStates.length > 0 ? (
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        disabled={disabled || !selectedCountry}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableStates.map((state, index) => (
                            <SelectItem key={index} value={state.code}>
                              {state.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      // If no states available, show a non-interactive placeholder
                      <Input
                        disabled
                        placeholder="No states available"
                        value="No states available"
                      />
                    )}
                  </FormControl>
                  <FormMessage /> {/* Display error message */}
                </FormItem>
              );
            }}
          />
        </div>
        <div className="flex gap-2">
          <FormField
            name="city"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder="Please enter city name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* Display error message */}
                </FormItem>
              );
            }}
          />
          <FormField
            name="zipcode"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem className="w-full">
                  <FormLabel>Zipcode</FormLabel>
                  <FormControl>
                    <Input
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      disabled={disabled}
                      placeholder="Please enter postal code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage /> {/* Display error message */}
                </FormItem>
              );
            }}
          />
        </div>

        <Button className="w-full" disabled={disabled} variant="destructive">
          {disabled ? "Saving..." : "Save Address"}
        </Button>
      </form>
    </Form>
  );
};
