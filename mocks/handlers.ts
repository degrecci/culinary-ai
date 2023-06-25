import { rest } from "msw";

export const handlers = [
  rest.post("https://api.openai.com/v1/chat/completions", (req, res, ctx) => {
    return res(
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
              content:
                '{\n    "description": "This classic apple pie recipe is perfect for any occasion. With a flaky crust and sweet apple filling, it\'s sure to be a crowd-pleaser.",\n    "difficulty_level": "Intermediate",\n    "ingredients": {\n        "crust": [\n            "2 1/2 cups all-purpose flour",\n            "1 tsp salt",\n            "1 tsp sugar",\n            "1 cup cold unsalted butter, cut into small pieces",\n            "1/4 to 1/2 cup ice water"\n        ],\n        "filling": [\n            "6 cups thinly sliced peeled Granny Smith apples",\n            "1/2 cup sugar",\n            "1/4 cup all-purpose flour",\n            "1 tsp ground cinnamon",\n            "1/4 tsp ground nutmeg",\n            "1/4 tsp salt",\n            "2 tbsp unsalted butter"\n        ]\n    },\n    "instructions": {\n        "crust": [\n            "In a large bowl, whisk together flour, salt, and sugar.",\n            "Using a pastry blender or your fingers, cut in butter until mixture resembles coarse crumbs.",\n            "Add ice water, 1 tablespoon at a time, until dough comes together.",\n            "Divide dough in half and shape into disks.",\n            "Wrap in plastic wrap and refrigerate for at least 30 minutes."\n        ],\n        "filling": [\n            "Preheat oven to 375°F.",\n            "In a large bowl, toss together apples, sugar, flour, cinnamon, nutmeg, and salt.",\n            "Pour filling into bottom crust and dot with butter.",\n            "Cover with top crust, seal edges, and cut slits in top to vent.",\n            "Bake for 45-50 minutes, until crust is golden brown and filling is bubbling."\n        ]\n    },\n    "prep_time": 30,\n    "serves": 8,\n    "tips_and_variations": "For a decorative touch, use cookie cutters to cut shapes out of the top crust before baking.",\n    "title": "Classic Apple Pie",\n    "total_time": 75\n}',
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
