import { Database } from "@/lib/supabase";
import React, { Suspense } from "react";
import RecipeModal from "./components/Modal";
import RecipesList from "./components/List";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Loading from "./loading";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase
    .from("recipes")
    .select("title, description, created_at, id")
    .order("created_at", { ascending: false });

  const recipes = data as Recipe[];

  return (
    <section className="text-gray-600 body-font">
      <div className="md:container md:mx-auto px-5 py-12">
        <RecipeModal />
        <Suspense fallback={<Loading />}>
          <RecipesList recipes={recipes} />
        </Suspense>
      </div>
    </section>
  );
}
