"use server";

import { generateRecipeSuggestions } from "@/ai/flows/honey-recipe-suggestions";
import { z } from "zod";

const RecipeSuggestionSchema = z.object({
  honeyType: z.string().min(1, { message: "Please select a honey type." }),
  userPreferences: z.string().optional(),
});

export type RecipeState = {
  message?: string;
  recipes?: {
    name: string;
    ingredients: string;
    instructions: string;
  }[];
  error?: string | null;
};

export async function getRecipeSuggestions(
  prevState: RecipeState,
  formData: FormData
): Promise<RecipeState> {
  const validatedFields = RecipeSuggestionSchema.safeParse({
    honeyType: formData.get("honeyType"),
    userPreferences: formData.get("userPreferences"),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.honeyType?.[0],
    };
  }
  
  try {
    const { honeyType, userPreferences } = validatedFields.data;
    const result = await generateRecipeSuggestions({
      honeyType,
      userPreferences,
    });
    
    if (result.recipes && result.recipes.length > 0) {
      return { recipes: result.recipes, error: null };
    } else {
      return { error: "Could not generate recipes. Please try again." };
    }
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred. Please try again later." };
  }
}
