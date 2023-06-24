"use client";
import { Database } from "@/lib/supabase";
import React, { useEffect } from "react";
import Image from "next/image";
import { supabaseClient } from "@/services/supabase";
import RecipeModal from "./components/RecipeModal";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { worker } = require("@/mocks/browser");

  worker.start();
}

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export default function Dashboard() {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  const getRecipes = async () => {
    const { data } = await supabaseClient.from("recipes").select("*");

    if (data) {
      return setRecipes(data);
    }
    return setRecipes([]);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="md:container md:mx-auto px-5 py-12">
        <div className="flex flex-wrap">
          <RecipeModal />
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
                <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">
                  SUBTITLE
                </h3>
                <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                  San Francisco
                </h2>
                <p className="leading-relaxed text-base">
                  Fingerstache flexitarian street art 8-bit waistcoat.
                  Distillery hexagon disrupt edison bulbche.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
