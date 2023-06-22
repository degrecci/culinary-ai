import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRecipeGenerator from "../hooks/use-generate-recipe";

const validationSchema = z.object({
  recipe: z.string().min(1, { message: "Required" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function RecipeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading, recipe, generateRecipe } = useRecipeGenerator();

  const onSubmit = async (data: { recipe: string }) => {
    await generateRecipe(data.recipe);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const errorMessagesClasses = "text-xs text-red-600 mt-1";

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        New Recipe
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <label htmlFor="recipe" className="leading-7 text-sm text-gray-600">
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
          <Button type="submit">Generate Recipe</Button>
        </form>
      </Modal>
    </>
  );
}
