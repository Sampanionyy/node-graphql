import { ingredientTypes, users } from "../data/db.js";

export const ingredientTypeResolver = {
    Ingredient: {
        type:  (ingredient, _args, _context, _info) => ingredientTypes.find((t) => t.id === ingredient.typeId) ?? null,
        owner: (ingredient, _args, _context, _info) => users.find((u) => u.id === ingredient.ownerId) ?? null,
    },
};
