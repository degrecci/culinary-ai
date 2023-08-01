"use client";
import { Recipe } from "@/app/types";
import { TrashIcon } from "@/assets/icons/trash";
import { supabaseClient } from "@/services/client";
import { useEffect, useState } from "react";
import { DeleteRecipesModal } from "../DeleteModal";
import { ViewRecipesModal } from "../ViewModal";
import { EyeIcon } from "@/assets/icons/eye";

type ListProps = {
  serverRecipes: Recipe[];
};

export type DeleteModalState = {
  isOpen: boolean;
  deleteId: number | null;
};

export type ViewModalState = {
  isOpen: boolean;
  recipe?: Recipe;
};

export default function RecipesList({ serverRecipes }: ListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(serverRecipes);
  const [deleteModal, setDeleteModal] = useState<DeleteModalState>({
    isOpen: false,
    deleteId: null,
  });
  const [viewModal, setViewModal] = useState<ViewModalState>({
    isOpen: false,
  });

  useEffect(() => {
    setRecipes(serverRecipes);
  }, [serverRecipes]);

  useEffect(() => {
    const channel = supabaseClient
      .channel("changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "recipes" },
        (payload) =>
          setRecipes((prevRecipes: any) => [payload.new, ...prevRecipes])
      )
      .subscribe();

    return () => {
      supabaseClient.removeChannel(channel);
    };
  }, [serverRecipes]);

  const removeRecipeFromState = (id: number | null) => {
    const newRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(newRecipes);
  };

  return (
    <div className="flex flex-wrap">
      <DeleteRecipesModal
        modal={deleteModal}
        setModal={setDeleteModal}
        removeRecipeFromState={removeRecipeFromState}
      />

      <ViewRecipesModal modal={viewModal} setModal={setViewModal} />

      <div className="mt-4 grid gap-4 md:grid-cols-4">
        {recipes.map((recipe) => {
          const date = new Date(recipe.created_at as string);
          const formattedCreatedAt = date.toLocaleString();

          return (
            <div
              className="flex flex-col rounded-lg bg-gray-100 p-6"
              key={recipe.id}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="title-font text-lg font-medium text-red-500">
                  {recipe.title}
                </h2>
                <button
                  className="h-8 w-8 rounded-full hover:bg-red-100"
                  onClick={() => setViewModal({ isOpen: true, recipe })}
                >
                  <EyeIcon className="m-auto w-7 text-red-500" />
                </button>
              </div>
              <p className="mb-3 grow text-base leading-relaxed">
                {recipe.description}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">{formattedCreatedAt}</p>

                <button
                  className="h-7 w-7 rounded-full hover:bg-red-100"
                  onClick={() =>
                    setDeleteModal({ isOpen: true, deleteId: recipe.id })
                  }
                >
                  <TrashIcon className="m-auto w-6 text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
