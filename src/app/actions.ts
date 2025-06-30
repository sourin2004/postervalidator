"use server";

import { validatePoster } from "@/ai/flows/validate-poster";
import { z } from "zod";

// The output from the AI flow will conform to this schema, but we'll add the imageUrl back in for the client.
const ValidationResultSchema = z.object({
  containsPoster: z.boolean(),
  boundingBox: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }).optional(),
  dimensionsCm: z.object({
    width: z.number(),
    height: z.number(),
  }).optional(),
  confidence: z.number().optional(),
  detectedText: z.string().optional(),
  imageUrl: z.string().url(),
});

export type ValidationResult = z.infer<typeof ValidationResultSchema>;

const ActionInputSchema = z.object({
  imageUrl: z.string().url({ message: "Invalid URL provided." }),
});

type ActionResponse = {
  data?: ValidationResult;
  error?: string;
};

export async function validateImage(
  input: z.infer<typeof ActionInputSchema>
): Promise<ActionResponse> {
  const parsedInput = ActionInputSchema.safeParse(input);
  if (!parsedInput.success) {
    return { error: "Invalid image URL format." };
  }

  const { imageUrl } = parsedInput.data;

  if (imageUrl.startsWith("https://www.google.com/url?")) {
    return { error: "The provided URL appears to be a Google search link, not a direct image URL. Please provide a direct link to an image file." };
  }
  
  try {
    const aiResult = await validatePoster({ imageUrl });
    
    return {
      data: {
        ...aiResult,
        imageUrl,
      },
    };
  } catch (aiError) {
    console.error("AI processing failed:", aiError);
    return { error: "AI processing failed. Please try again with a different image." };
  }
}
