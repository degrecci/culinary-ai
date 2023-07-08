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

      <div className="grid md:grid-cols-4 gap-4 mt-4">
        {recipes.map((recipe) => {
          const date = new Date(recipe.created_at as string);
          const formattedCreatedAt = date.toLocaleString();

          return (
            <div
              className="bg-gray-100 p-6 rounded-lg flex flex-col"
              key={recipe.id}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg text-red-500 font-medium title-font">
                  {recipe.title}
                </h2>
                <button
                  className="hover:bg-red-100 rounded-full w-8 h-8"
                  onClick={() => setViewModal({ isOpen: true, recipe })}
                >
                  <EyeIcon className="w-7 m-auto text-red-500" />
                </button>
              </div>
              <p className="leading-relaxed text-base mb-3 grow">
                {recipe.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{formattedCreatedAt}</p>

                <button
                  className="hover:bg-red-100 rounded-full w-7 h-7"
                  onClick={() =>
                    setDeleteModal({ isOpen: true, deleteId: recipe.id })
                  }
                >
                  <TrashIcon className="w-6 m-auto text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
