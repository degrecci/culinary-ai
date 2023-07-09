import { rest } from "msw";
import { rand, randFood } from "@ngneat/falso";

function convertToString(obj: Record<string, unknown>): string {
  return JSON.stringify(obj, null, 4);
}

export const handlers = [
  rest.post("https://api.openai.com/v1/chat/completions", (req, res, ctx) => {
    const foodName = randFood();

    const randRecipe = {
      description: `This classic ${foodName} recipe is perfect for any occasion. It's sure to be a crowd-pleaser.`,
      difficulty_level: rand(["Easy", "Intermediate", "Hard"]),
      ingredients: {
        crust: [
          "2 1/2 cups all-purpose flour",
          "1 tsp salt",
          "1 tsp sugar",
          "1 cup cold unsalted butter, cut into small pieces",
          "1/4 to 1/2 cup ice water",
        ],
        filling: [
          "6 cups thinly sliced peeled Granny Smith apples",
          "1/2 cup sugar",
          "1/4 cup all-purpose flour",
          "1 tsp ground cinnamon",
          "1/4 tsp ground nutmeg",
          "1/4 tsp salt",
          "2 tbsp unsalted butter",
        ],
      },
      instructions: {
        crust: [
          "In a large bowl, whisk together flour, salt, and sugar.",
          "Using a pastry blender or your fingers, cut in butter until mixture resembles coarse crumbs.",
          "Add ice water, 1 tablespoon at a time, until dough comes together.",
          "Divide dough in half and shape into disks.",
          "Wrap in plastic wrap and refrigerate for at least 30 minutes.",
        ],
        filling: [
          "Preheat oven to 375°F.",
          "In a large bowl, toss together apples, sugar, flour, cinnamon, nutmeg, and salt.",
          "Pour filling into bottom crust and dot with butter.",
          "Cover with top crust, seal edges, and cut slits in top to vent.",
          "Bake for 45-50 minutes, until crust is golden brown and filling is bubbling.",
        ],
      },
      prep_time: rand([5, 10, 20, 30, 60]),
      serves: rand([1, 2, 4, 8, 12]),
      tips_and_variations:
        "For a decorative touch, use cookie cutters to cut shapes out of the top crust before baking.",
      title: foodName,
      total_time: rand([20, 30, 60, 120, 160]),
    };

    const content = convertToString(randRecipe);

    return res(
      ctx.delay(1500),
      ctx.status(200),
      ctx.json({
        id: "chatcmpl-7Tinab1lyDIc9Oc1qQaJfsx2Kst9F",
        object: "chat.completion",
        created: 1687318074,
        model: "gpt-3.5-turbo-0301",
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content,
            },
            finish_reason: "stop",
          },
        ],
        usage: {
          prompt_tokens: 108,
          completion_tokens: 442,
          total_tokens: 550,
        },
      })
    );
  }),
];
