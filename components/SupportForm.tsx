"use client";
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
} from "@/components/ui/form";
import { supportSchema } from "@/lib/zod-schema";
import { Textarea } from "@/components/ui/textarea";

type FormValues = z.input<typeof supportSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  disabled?: boolean;
};

export const SupportForm = ({
  id,
  onSubmit,
  defaultValues,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(supportSchema),
    defaultValues: defaultValues,
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
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="rounded-xl"
                  disabled={disabled}
                  placeholder="Please enter you email"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <FormLabel>Enquiry Title</FormLabel>
                <FormControl>
                  <Input
                    className="rounded-xl"
                    disabled={disabled}
                    placeholder="Please enter you enquiry title"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />

        <FormField
          name="description"
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
            </FormItem>
          )}
        />

        <Button
          className="w-full rounded-xl"
          disabled={disabled}
          variant="destructive"
        >
          {id ? "Submitting......" : "Submit your request"}
        </Button>
      </form>
    </Form>
  );
};