import { Recipe } from "@/app/types";
import { Json } from "@/lib/supabase";
import React from "react";

type Props = {
  recipe: Recipe;
};

const ViewRecipe = ({ recipe }: Props) => {
  function showJsonList(json: Json) {
    if (!json) {
      return "";
    }

    return Object.entries(json).map(([key, values]) => (
      <li key={key}>
        <strong>{key}:</strong>
        <ul>
          {values.map((value: string, index: string) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </li>
    ));
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">{recipe.title}</h3>
      <p className="text-lg">{recipe.description}</p>
      <p>{recipe.difficulty_level}</p>
      <p>{recipe.prep_time}</p>
      <p>{recipe.total_time}</p>
      <p>{recipe.serves}</p>
      <p>{showJsonList(recipe.ingredients)}</p>
      <p>{showJsonList(recipe.instructions)}</p>
      <p>{recipe.tips_and_variations}</p>
    </div>
  );
};

export default ViewRecipe;
