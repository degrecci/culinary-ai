"use client";

import { Dispatch, SetStateAction } from "react";

import { Button } from "@/app/components/Button";
import { DeleteModalState } from "../List";
import { Modal } from "@/app/components/Modal";
import { TrashIcon } from "@/assets/icons/trash";
import { supabaseClient } from "@/services/client";

type DeleteModalProps = {
  modal: DeleteModalState;
  setModal: Dispatch<SetStateAction<DeleteModalState>>;
  removeRecipeFromState: (id: number | null) => void;
};

export const DeleteRecipesModal: React.FC<DeleteModalProps> = ({
  modal,
  setModal,
  removeRecipeFromState,
}) => {
  const handleDeleteRecipe = async (id: number | null) => {
    if (!id) {
      return;
    }

    const { error } = await supabaseClient
      .from("recipes")
      .delete()
      .eq("id", id);

    if (!error) {
      removeRecipeFromState(id);
    }

    return setModal({ isOpen: false, deleteId: null });
  };

  return (
    <Modal
      isOpen={modal.isOpen}
      onClose={() => setModal({ isOpen: false, deleteId: null })}
    >
      <div className="flex flex-col items-center justify-center">
        <TrashIcon className="mb-4 w-10 text-gray-500" />
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
  );
};
