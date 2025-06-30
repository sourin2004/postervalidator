"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ScanLine } from "lucide-react";

const formSchema = z.object({
  imageUrl: z.string().url({ message: "Please enter a valid URL." }),
});

type PosterFormProps = {
  onSubmit: (imageUrl: string) => void;
  isLoading: boolean;
};

export function PosterForm({ onSubmit, isLoading }: PosterFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "https://placehold.co/600x800.png",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.imageUrl);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/poster.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ScanLine />
          )}
          Validate Poster
        </Button>
      </form>
    </Form>
  );
}
