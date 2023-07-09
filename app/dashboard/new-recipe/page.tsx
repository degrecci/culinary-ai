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
      <p className="w-full h-[calc(100vh-130px)] flex justify-center items-center text-red-500 text-lg">
        Generating new recipe...
      </p>
    );
  }

  return (
    <>
      {!recipe && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4 md:w-2/6">
            <label htmlFor="recipe" className="leading-7 text-sm text-gray-600">
              My recipe will be about
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
