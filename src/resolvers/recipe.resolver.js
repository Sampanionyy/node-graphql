import { users, recipeTypes, recipeIngredients, recipeSteps, comments, recipeLikes, recipes, ingredients } from "../data/db.js";

export const recipeTypeResolver = {
    Recipe: {
        owner:             (recipe, _args, _context, _info) => users.find((u) => u.id === recipe.ownerId) ?? null,
        type:              (recipe, _args, _context, _info) => recipeTypes.find((t) => t.id === recipe.typeId) ?? null,
        recipeIngredients: (recipe, _args, _context, _info) => recipeIngredients.filter((ri) => ri.recipeId === recipe.id),
        recipe_steps:      (recipe, _args, _context, _info) => recipeSteps.filter((s) => s.recipeId === recipe.id),
        comments:          (recipe, _args, _context, _info) => comments.filter((c) => c.parentId === recipe.id),
        likeCount:         (recipe, _args, _context, _info) => recipeLikes.filter((l) => l.recipeId === recipe.id).length,
        likes:             (recipe, _args, _context, _info) =>
            recipeLikes
                .filter((l) => l.recipeId === recipe.id)
                .map((l) => ({
                    id: { recipeId: l.recipeId, userId: l.userId },
                    likedAt: l.likedAt,
                    recipe,
                    user: users.find((u) => u.id === l.userId),
                })),
    },

    RecipeIngredient: {
        ingredient: (ri, _args, _context, _info) => ingredients.find((i) => i.id === ri.ingredientId) ?? null,
        recipe:     (ri, _args, _context, _info) => recipes.find((r) => r.id === ri.recipeId) ?? null,
    },

    RecipeStep: {
        recipe:   (step, _args, _context, _info) => recipes.find((r) => r.id === step.recipeId) ?? null,
        comments: (step, _args, _context, _info) => comments.filter((c) => c.parentId === step.id),
    },

    RecipeLike: {
        recipe: (like, _args, _context, _info) => recipes.find((r) => r.id === like.id.recipeId) ?? null,
        user:   (like, _args, _context, _info) => users.find((u) => u.id === like.id.userId) ?? null,
    },
};
