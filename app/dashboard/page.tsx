import { Database } from "@/lib/supabase";
import React from "react";
import Image from "next/image";
import RecipeModal from "./components/RecipeModal";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("recipes").select();

  const recipes = data as Recipe[];

  console.log({ recipes, error });

  return (
    <section className="text-gray-600 body-font">
      <div className="md:container md:mx-auto px-5 py-12">
        <RecipeModal />
        <div className="flex flex-wrap">
          {recipes.map((recipe) => (
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
                <p className="leading-relaxed text-base">
                  {recipe.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
