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
      imageUrl: "https://placehold.co/800x600/0f0f0f/ff4c00.png",
    },
  });

  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values.imageUrl);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline text-lg">Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/poster.jpg" {...field} className="py-6 text-base" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full py-6 text-lg font-bold transition-shadow hover:shadow-glow-primary" disabled={isLoading}>
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
