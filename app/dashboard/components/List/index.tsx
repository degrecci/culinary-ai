"use client";

import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { Recipe } from "@/app/types";
import { TrashIcon } from "@/assets/icons/trash";
import { supabaseClient } from "@/services/client";
import { useEffect, useState } from "react";

type ListProps = {
  serverRecipes: Recipe[];
};

type ModalState = {
  isOpen: boolean;
  deleteId: number | null;
};

export default function RecipesList({ serverRecipes }: ListProps) {
  const [recipes, setRecipes] = useState<Recipe[]>(serverRecipes);
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    deleteId: null,
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

  const handleDeleteRecipe = async (id: number | null) => {
    const { error } = await supabaseClient
      .from("recipes")
      .delete()
      .eq("id", id);

    if (!error) {
      const newRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(newRecipes);
    }

    return setModal({ isOpen: false, deleteId: null });
  };

  return (
    <div className="flex flex-wrap">
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ isOpen: false, deleteId: null })}
      >
        <div className="flex flex-col items-center justify-center">
          <TrashIcon className="w-10 text-gray-500 mb-4" />
          <p className="text-base">
            Are you sure you want to delete this recipe? This action cannot be
            undone.
          </p>
          <div className="mt-5">
            <Button
              secondary
              onClick={() => setModal({ isOpen: false, deleteId: null })}
              className="mr-6"
            >
              Cancel
            </Button>
            <Button onClick={() => handleDeleteRecipe(modal.deleteId)}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className="grid md:grid-cols-4 gap-4 mt-4">
        {recipes.map((recipe) => {
          const date = new Date(recipe.created_at as string);
          const formattedCreatedAt = date.toLocaleString();

          return (
            <div
              className="bg-gray-100 p-6 rounded-lg flex flex-col"
              key={recipe.id}
            >
              <h2 className="text-lg text-red-500 font-medium title-font mb-4">
                {recipe.title}
              </h2>
              <p className="leading-relaxed text-base mb-3 grow">
                {recipe.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{formattedCreatedAt}</p>
                <button
                  className="hover:bg-red-100 rounded-full w-7 h-7"
                  onClick={() =>
                    setModal({ isOpen: true, deleteId: recipe.id })
                  }
                >
                  <TrashIcon className="w-5 m-auto text-red-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
