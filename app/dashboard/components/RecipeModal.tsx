import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRecipeGenerator from "../hooks/use-generate-recipe";
import ViewRecipe from "@/app/components/ViewRecipe";

const validationSchema = z.object({
  recipe: z.string().min(1, { message: "Required" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function RecipeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, recipe, generateRecipe, cleanRecipe } =
    useRecipeGenerator();

  const onSubmit = async (data: { recipe: string }) => {
    await generateRecipe(data.recipe);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const handleTryAnother = () => {
    cleanRecipe();
    reset();
  };

  const errorMessagesClasses = "text-xs text-red-600 mt-1";

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        New Recipe
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {recipe && (
          <div className="relative mb-4">
            <ViewRecipe recipe={recipe} />
            <div className="flex justify-between">
              <Button secondary onClick={handleTryAnother}>
                Try another
              </Button>
              <Button>Save</Button>
            </div>
          </div>
        )}
        {!recipe && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-4">
              <label
                htmlFor="recipe"
                className="leading-7 text-sm text-gray-600"
              >
                Type what you would like the recipe to be about
              </label>
              <input
                {...register("recipe")}
                type="text"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Pie with chicken"
              />
              {errors.recipe && (
                <p className={errorMessagesClasses}>{errors.recipe?.message}</p>
              )}
            </div>
            <Button type="submit" isLoading={isLoading}>
              Generate Recipe
            </Button>
          </form>
        )}
      </Modal>
    </>
  );
}
