import { Button } from "@/app/components/Button";
import { Modal } from "@/app/components/Modal";
import { useState } from "react";
import { useForm } from "react-hook-form";

async function generateRecipe({ text }: { text: string }) {
  const prompt = `${text}
    Generate a recipe with the following structure:
    - cook_time: string | null;
    - created_at: string | null;
    - description: string | null;
    - difficulty_level: string | null;
    - id: number;
    - ingredients: Json | null;
    - instructions: Json | null;
    - prep_time: string | null;
    - serves: number | null;
    - tips_and_variations: string | null;
    - title: string;
    - total_time: string | null;
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

export default function RecipeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm<{ text: string }>();

  const onSubmit = async (data: { text: string }) => {
    const recipe = await generateRecipe({ text: data.text });
    console.log(recipe);
  };

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        New Recipe
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Texto
            </label>
            <input
              {...register("text")}
              type="text"
              className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />{" "}
            {/* {errors.text && (
            <p className={errorMessagesClasses}>{errors.text?.message}</p>
          )} */}
          </div>
          <Button type="submit">Generate Recipe</Button>
        </form>
      </Modal>
    </>
  );
}
