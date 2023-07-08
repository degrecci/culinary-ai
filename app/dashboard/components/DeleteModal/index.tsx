"use client";
import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { TrashIcon } from "@/assets/icons/trash";
import { supabaseClient } from "@/services/client";
import { ModalState } from "../List";
import { Dispatch, SetStateAction } from "react";

type DeleteModalProps = {
  modal: ModalState;
  setModal: Dispatch<SetStateAction<ModalState>>;
  removeRecipeFromState: (id: number | null) => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  modal,
  setModal,
  removeRecipeFromState,
}) => {
  const handleDeleteRecipe = async (id: number | null) => {
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
  );
};
