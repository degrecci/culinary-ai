"use client";
import { Button } from "@/app/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ViewRecipe from "@/app/components/ViewRecipe";
import useRecipeGenerator from "../hooks/use-generate-recipe";
import { useSaveRecipe } from "../hooks/use-save-recipe";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  recipe: z.string().min(1, { message: "Required" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function NewRecipe() {
  const router = useRouter();
  const { isLoading, error, recipe, generateRecipe, cleanRecipe } =
    useRecipeGenerator();
  const { saveRecipe, isSavingRecipe } = useSaveRecipe();
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

  const handleSaveRecipe = async () => {
    if (!recipe) return;

    await saveRecipe(recipe);
    router.push("/dashboard");
  };

  const handleTryAnother = () => {
    cleanRecipe();
    reset();
  };

  const errorMessagesClasses = "text-xs text-red-600 mt-1";

  if (isLoading) {
    return (
      <p className="flex h-[calc(100vh-130px)] w-full items-center justify-center text-lg text-red-500">
        Generating new recipe...
      </p>
    );
  }

  return (
    <>
      {!recipe && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4 md:w-2/6">
            <label htmlFor="recipe" className="text-sm leading-7 text-gray-600">
              My recipe will be about
            </label>
            <input
              {...register("recipe")}
              type="text"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-red-500 focus:ring-2 focus:ring-red-200"
              placeholder="Pie with chicken"
            />
            {errors.recipe && (
              <p className={errorMessagesClasses}>{errors.recipe?.message}</p>
            )}

            {error && <p className={errorMessagesClasses}>{error.message}</p>}
          </div>

          <div className="flex justify-between">
            <Button type="submit">Generate recipe</Button>
          </div>
        </form>
      )}

      {recipe && (
        <div className="relative">
          <ViewRecipe recipe={recipe} />
          <div className="flex justify-between">
            <Button secondary onClick={handleTryAnother}>
              Try another
            </Button>
            <Button onClick={handleSaveRecipe} isLoading={isSavingRecipe}>
              Save
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
