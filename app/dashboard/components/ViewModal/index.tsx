import { Modal } from "@/app/components/Modal";
import ViewRecipe from "@/app/components/ViewRecipe";
import { ViewModalState } from "../List";
import { Button } from "@/app/components/Button";

type ViewRecipesModalProps = {
  modal: ViewModalState;
  setModal: React.Dispatch<React.SetStateAction<ViewModalState>>;
};

export const ViewRecipesModal: React.FC<ViewRecipesModalProps> = ({
  modal,
  setModal,
}) => {
  if (!modal.recipe) {
    return null;
  }

  return (
    <Modal isOpen={true} onClose={() => setModal({ isOpen: false })}>
      <ViewRecipe recipe={modal.recipe} />
      <div className="flex justify-center">
        <Button onClick={() => setModal({ isOpen: false })}>Close</Button>
      </div>
    </Modal>
  );
};
