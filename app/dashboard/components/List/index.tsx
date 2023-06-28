import { Recipe } from "@/app/types";
import Image from "next/image";

type ListProps = {
  recipes: Recipe[];
};

export default function RecipesList({ recipes }: ListProps) {
  return (
    <div className="flex flex-wrap">
      {recipes.map((recipe) => {
        const date = new Date(recipe.created_at as string);
        const formattedCreatedAt = date.toLocaleString();

        return (
          <div className="xl:w-1/4 md:w-1/2 p-4" key={recipe.id}>
            <div className="bg-gray-100 p-6 rounded-lg">
              <Image
                width={720}
                height={400}
                className="h-40 rounded w-full object-cover object-center mb-6"
                src="https://dummyimage.com/720x400"
                alt="content"
              />
              <h2 className="text-lg text-red-500 font-medium title-font mb-4">
                {recipe.title}
              </h2>
              <p className="leading-relaxed text-base">{recipe.description}</p>
              <p className="text-xs text-gray-500 mt-3">{formattedCreatedAt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
