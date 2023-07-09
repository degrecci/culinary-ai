import { Database } from "@/lib/supabase";
import React, { Suspense } from "react";
import RecipesList from "./components/List";
import Loading from "./loading";
import { supabaseServer } from "@/services/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../components/Button";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export const revalidate = 0;

export default async function Dashboard() {
  const { data } = await supabaseServer({ cookies })
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <div className="flex w-full justify-end">
        <Link href="dashboard/new-recipe">
          <Button data-type="button">New Recipe</Button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <RecipesList serverRecipes={data as Recipe[]} />
      </Suspense>
    </>
  );
}
