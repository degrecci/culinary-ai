import { Recipe } from "@/app/types";
import { Json } from "@/lib/supabase";
import React from "react";

type Props = {
  recipe: Recipe;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showJsonList(json: Json) {
  if (!json) {
    return "";
  }

  return Object.entries(json).map(([key, values]) => (
    <li className="list-none mb-3" key={key}>
      <strong>{capitalizeFirstLetter(key)}:</strong>
      <ul>
        {values.map((value: string, index: string) => (
          <li key={index}>- {value}</li>
        ))}
      </ul>
    </li>
  ));
}

const ViewRecipe = ({ recipe }: Props) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-2">{recipe.title}</h3>
      <p className="text-md mb-4">{recipe.description}</p>
      <p className="text-sm">Difficult level: {recipe.difficulty_level}</p>
      <p className="text-sm">Preparation time: {recipe.prep_time}</p>
      <p className="text-sm">Total time: {recipe.total_time}</p>
      <p className="text-sm mb-4">Serves: {recipe.serves}</p>
      <p className="text-md mb-2 font-semibold">Ingredients</p>
      <p className="text-sm mb-4">{showJsonList(recipe.ingredients)}</p>
      <p className="text-md mb-2 font-semibold">Instructions</p>
      <p className="text-sm mb-4">{showJsonList(recipe.instructions)}</p>
      <p className="text-md font-semibold">Tips</p>
      <p className="text-sm mb-8">{recipe.tips_and_variations}</p>
    </div>
  );
};

export default ViewRecipe;
