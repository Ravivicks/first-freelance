"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useProductsStore } from "@/stores/useProductStore";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useFilterOpen } from "@/hooks/use-filter-open";

const FormSchema = z.object({
  brands: z.array(z.string()), // Remove validation for at least one brand
  categories: z.array(z.string()), // Remove validation for at least one category
});

export function CheckboxReactHookFormMultiple() {
  const { brands, categories } = useProductsStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { onClose } = useFilterOpen();

  const brand = searchParams.get("brand");
  const category = searchParams.get("category");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brands: [],
      categories: [],
    },
  });

  useEffect(() => {
    if (brand) {
      form.setValue("brands", Array.isArray(brand) ? brand : [brand]);
    }

    if (category) {
      form.setValue(
        "categories",
        Array.isArray(category) ? category : [category]
      );
    }
  }, [brand, category, form]);

  const [showMoreBrands, setShowMoreBrands] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const brandString = data.brands.join(",");
    const categoryString = data.categories.join(",");

    router.push(
      `/en/product-details/Siemens?type=all&category=${encodeURIComponent(
        categoryString
      )}&brand=${encodeURIComponent(brandString)}`
    );
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="brands"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-muted-foreground font-bold">
                  Brands
                </FormLabel>
              </div>
              {brands
                .slice(0, showMoreBrands ? brands.length : 10)
                .map((item, index: number) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name="brands"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), item.value]
                                : field.value?.filter(
                                    (value) => value !== item.value
                                  ) || [];
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              {brands.length > 10 && (
                <Button
                  type="button"
                  className="p-0 text-destructive"
                  variant="link"
                  onClick={() => setShowMoreBrands(!showMoreBrands)}
                >
                  {showMoreBrands ? "Show Less" : "Show More"}
                  {!showMoreBrands ? (
                    <ChevronDown className="size-4 ml-1" />
                  ) : (
                    <ChevronUp className="size-4 ml-1" />
                  )}
                </Button>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-muted-foreground font-bold">
                  Categories
                </FormLabel>
              </div>
              {categories
                .slice(0, showMoreCategories ? categories.length : 10)
                .map((item, index: number) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name="categories"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.value)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...(field.value || []), item.value]
                                : field.value?.filter(
                                    (value) => value !== item.value
                                  ) || [];
                              field.onChange(newValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              {categories.length > 10 && (
                <Button
                  type="button"
                  className="p-0 text-destructive"
                  variant="link"
                  onClick={() => setShowMoreCategories(!showMoreCategories)}
                >
                  {showMoreCategories ? "Show Less" : "Show More"}
                  {!showMoreCategories ? (
                    <ChevronDown className="size-4 ml-1" />
                  ) : (
                    <ChevronUp className="size-4 ml-1" />
                  )}
                </Button>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="destructive" className="w-full">
          Apply Filter
        </Button>
      </form>
    </Form>
  );
}
