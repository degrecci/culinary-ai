"use client";

import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { Recipe } from "@/app/types";
import { TrashIcon } from "@/assets/icons/trash";
import { supabaseClient } from "@/services/supabase";
import Image from "next/image";
import { useState } from "react";

type ListProps = {
  recipes: Recipe[];
};

type ModalState = {
  isOpen: boolean;
  deleteId: number | null;
};

export default function RecipesList({ recipes }: ListProps) {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    deleteId: null,
  });

  const handleDeleteRecipe = async (id: number | null) => {
    await supabaseClient.from("recipes").delete().eq("id", id);
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
              <p className="leading-relaxed text-base mb-3">
                {recipe.description}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">{formattedCreatedAt}</p>
                <button
                  onClick={() =>
                    setModal({ isOpen: true, deleteId: recipe.id })
                  }
                >
                  <TrashIcon className="w-4 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
