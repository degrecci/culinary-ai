import { Recipe } from "@/app/types";
import React from "react";

type Props = {
  recipe: Recipe;
};

const ViewRecipe = ({ recipe }: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-bold">{recipe.title}</h3>
      <p className="text-lg">{recipe.description}</p>
      <p>{recipe.difficulty_level}</p>
      <p>{recipe.prep_time}</p>
      <p>{recipe.total_time}</p>
      <p>{recipe.serves}</p>
      <p>{JSON.stringify(recipe.ingredients)}</p>
      <p>{JSON.stringify(recipe.instructions)}</p>
      <p>{recipe.tips_and_variations}</p>
    </div>
  );
};

export default ViewRecipe;
