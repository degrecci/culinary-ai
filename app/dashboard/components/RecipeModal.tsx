import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

async function generateRecipe({ text }: { text: string }) {
  const prompt = `
    Generate a ${text} recipe returning a json with the following structure:
    - cook_time: number | null;
    - description: string | null;
    - difficulty_level: string | null;
    - ingredients: Json | null;
    - instructions: Json | null;
    - prep_time: number | null;
    - serves: number | null;
    - tips_and_variations: string | null;
    - title: string;
    - total_time: number | null;
  `;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const recipe = data.choices[0].text.trim();
    return recipe;
  } catch (error) {
    console.error("Error generating recipe:", error);
    return null;
  }
}

const validationSchema = z.object({
  recipe: z.string().min(1, { message: "Required" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function RecipeModal() {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: { recipe: string }) => {
    const recipe = await generateRecipe({ text: data.recipe });
    console.log(recipe);
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
