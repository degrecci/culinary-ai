import { Recipe } from "@/app/types";
import { supabaseClient } from "@/services/client";
import { useState } from "react";

interface SaveRecipeHook {
  isSavingRecipe: boolean;
  saveRecipe: (recipe: Recipe) => Promise<void>;
}

export const useSaveRecipe = (): SaveRecipeHook => {
  const [isSavingRecipe, setIsSavingRecipe] = useState(false);

  const saveRecipe = async (recipe: Recipe) => {
    setIsSavingRecipe(true);

    try {
      await supabaseClient
        .from("recipes")
        .insert([
          {
            title: recipe.title,
            description: recipe.description,
            difficulty_level: recipe.difficulty_level,
            total_time: recipe.total_time,
            prep_time: recipe.prep_time,
            serves: recipe.serves,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            tips_and_variations: recipe.tips_and_variations,
          },
        ])
        .single();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSavingRecipe(false);
    }
  };

  return {
    saveRecipe,
    isSavingRecipe,
  };
};
