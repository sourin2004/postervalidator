"use server";

import { improveDetectedText } from "@/ai/flows/improve-detected-text";
import { detectTextInImage } from "@/ai/flows/detect-text";
import { z } from "zod";

const BoundingBoxSchema = z.object({
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

const DimensionsCmSchema = z.object({
  width: z.number(),
  height: z.number(),
});

const ValidationResultSchema = z.object({
  containsPoster: z.boolean(),
  boundingBox: BoundingBoxSchema.optional(),
  dimensionsCm: DimensionsCmSchema.optional(),
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

// This is a simulated API call.
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

  // Simulate an invalid image URL case
  if (imageUrl.includes("invalid")) {
    return { error: "The provided image URL is invalid or inaccessible." };
  }
  
  // Simulate a short delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate API response: 75% chance to find a poster
  if (Math.random() > 0.25) {
    const boundingBox = {
      x: Math.floor(Math.random() * 50) + 50,
      y: Math.floor(Math.random() * 80) + 60,
      width: Math.floor(Math.random() * 200) + 250,
      height: Math.floor(Math.random() * 300) + 350,
    };

    try {
      const { detectedText: rawDetectedText } = await detectTextInImage({ imageUrl });

      let improvedText = "No text could be detected in the image.";
      if (rawDetectedText && rawDetectedText.trim().length > 0) {
        const result = await improveDetectedText({ detectedText: rawDetectedText });
        improvedText = result.improvedText;
      }
      
      return {
        data: {
          containsPoster: true,
          boundingBox,
          dimensionsCm: { width: 29.7, height: 42.0 }, // A3 size
          confidence: Math.random() * (0.99 - 0.85) + 0.85, // Confidence between 85% and 99%
          detectedText: improvedText,
          imageUrl,
        },
      };
    } catch (aiError) {
      console.error("AI processing failed:", aiError);
      return { error: "AI processing failed. Please try again with a different image." };
    }
  } else {
    // Simulate case where no poster is found
    return {
      data: {
        containsPoster: false,
        imageUrl,
      },
    };
  }
}
