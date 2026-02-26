import { users, recipes, recipeSteps } from "../data/db.js";

export const reportTypeResolver = {
    Comment: {
        owner:  (comment, _args, _context, _info) => users.find((u) => u.id === comment.ownerId) ?? null,
        parent: (comment, _args, _context, _info) => ({ id: comment.parentId, comments: [] }),
    },

    Report: {
        reporter:   (report, _args, _context, _info) => users.find((u) => u.id === report.reporterId) ?? null,
        target:     (report, _args, _context, _info) => ({ id: report.targetId }),
        recipe:     (report, _args, _context, _info) => report.targetType === "Recipe"     ? recipes.find((r) => r.id === report.targetId) ?? null : null,
        recipeStep: (report, _args, _context, _info) => report.targetType === "RecipeStep" ? recipeSteps.find((s) => s.id === report.targetId) ?? null : null,
        user:       (report, _args, _context, _info) => report.targetType === "User"       ? users.find((u) => u.id === report.targetId) ?? null : null,
    },
};
