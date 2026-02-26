import { recipeLikes, recipes } from "../data/db.js";

export const userTypeResolver = {
    User: {
        recipeLikes: (user, _args, _context, _info) =>
            recipeLikes
                .filter((l) => l.userId === user.id)
                .map((l) => ({
                    id: { recipeId: l.recipeId, userId: l.userId },
                    likedAt: l.likedAt,
                    recipe: recipes.find((r) => r.id === l.recipeId),
                    user,
                })),
    },
};
