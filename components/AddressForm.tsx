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
import { useTranslations } from "next-intl";

type FormValues = z.input<typeof formAddressSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const AddressForm = ({ onSubmit, defaultValues, disabled }: Props) => {
  const t = useTranslations("addressForm"); // Use translations from the JSON

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
                <FormLabel>{t("labels.firstName")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={t("placeholders.firstName")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("labels.lastName")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={t("placeholders.lastName")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                <FormLabel>{t("labels.phone")}</FormLabel>
                <FormControl>
                  <Input
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    type="number"
                    disabled={disabled}
                    placeholder={t("placeholders.phone")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("labels.email")}</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder={t("placeholders.email")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                <FormLabel>{t("labels.address")}</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={disabled}
                    placeholder={t("placeholders.address")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                  <FormLabel>{t("labels.country")}</FormLabel>
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
                        <SelectValue placeholder={t("placeholders.country")} />
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
                  <FormMessage />
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
                  <FormLabel>{t("labels.state")}</FormLabel>
                  <FormControl>
                    {availableStates.length > 0 ? (
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                        disabled={disabled || !selectedCountry}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t("placeholders.state")} />
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
                      <Input
                        disabled
                        placeholder={t("placeholders.noStatesAvailable")}
                        value={t("placeholders.noStatesAvailable")}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
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
                  <FormLabel>{t("labels.city")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={disabled}
                      placeholder={t("placeholders.city")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                  <FormLabel>{t("labels.zipcode")}</FormLabel>
                  <FormControl>
                    <Input
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      disabled={disabled}
                      placeholder={t("placeholders.zipcode")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <Button className="w-full" disabled={disabled} variant="destructive">
          {disabled ? t("buttons.saving") : t("buttons.saveAddress")}
        </Button>
      </form>
    </Form>
  );
};
