import {
    getUsers, getUser, addUser,
    getIngredients, getIngredient, getIngredientTypes, searchIngredients, addIngredient,
    getRecipes, getRecipe, getRecipeTypes, searchRecipes,
    getComments, addComment,
    getReports, addReport,
    recipeIngredients, recipeSteps, recipeLikes,
    ingredientTypes, ingredients, users, recipes, recipeTypes, comments,
} from "../services/service.js";

export const resolvers = {
    // ── Scalaires custom ─────────────────────────────────────
    // BigInteger : on stocke en BigInt JS, on sérialise en String pour JSON
    BigInteger: {
        serialize: (value) => value?.toString() ?? null,
        parseValue: (value) => BigInt(value),
        parseLiteral: (ast) => BigInt(ast.value),
    },
    // Date : simple string ISO "YYYY-MM-DD"
    Date: {
        serialize: (value) => value,
        parseValue: (value) => value,
        parseLiteral: (ast) => ast.value,
    },
    // DateTime : string ISO complète
    DateTime: {
        serialize: (value) => value,
        parseValue: (value) => value,
        parseLiteral: (ast) => ast.value,
    },
    // BigDecimal : number JS
    BigDecimal: {
        serialize: (value) => value,
        parseValue: (value) => parseFloat(value),
        parseLiteral: (ast) => parseFloat(ast.value),
    },

    // ── Query ────────────────────────────────────────────────
    Query: {
        users: (_root, _args, _context, _info) => getUsers(),
        user: (_root, { id }, _context, _info) => getUser(id),

        ingredients: (_root, _args, _context, _info) => getIngredients(),
        ingredient: (_root, { id }, _context, _info) => getIngredient(id),
        ingredientTypes: (_root, _args, _context, _info) => getIngredientTypes(),
        searchIngredients: (_root, { filter, sortBy }, _context, _info) => searchIngredients({ filter, sortBy }),

        recipes: (_root, _args, _context, _info) => getRecipes(),
        recipe: (_root, { id }, _context, _info) => getRecipe(id),
        recipeTypes: (_root, _args, _context, _info) => getRecipeTypes(),
        searchRecipes: (_root, { filter, sortBy }, _context, _info) => searchRecipes({ filter, sortBy }),

        comments: (_root, _args, _context, _info) => getComments(),
        reports: (_root, _args, _context, _info) => getReports(),
    },

    // ── Mutation ─────────────────────────────────────────────
    Mutation: {
        addUser: (_root, args, _context, _info) => addUser(args),
        addIngredient: (_root, args, _context, _info) => addIngredient(args),
        addComment: (_root, args, _context, _info) => addComment(args),
        addReport: (_root, args, _context, _info) => addReport(args),
    },

    // ── Type resolvers ────────────────────────────────────────

    // User
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

    // Ingredient
    Ingredient: {
        type: (ingredient, _args, _context, _info) => ingredientTypes.find((t) => t.id === ingredient.typeId) ?? null,
        owner: (ingredient, _args, _context, _info) => users.find((u) => u.id === ingredient.ownerId) ?? null,
    },

    // Recipe
    Recipe: {
        owner: (recipe, _args, _context, _info) => users.find((u) => u.id === recipe.ownerId) ?? null,
        type: (recipe, _args, _context, _info) => recipeTypes.find((t) => t.id === recipe.typeId) ?? null,
        recipeIngredients: (recipe, _args, _context, _info) => recipeIngredients.filter((ri) => ri.recipeId === recipe.id),
        recipe_steps: (recipe, _args, _context, _info) => recipeSteps.filter((s) => s.recipeId === recipe.id),
        comments: (recipe, _args, _context, _info) => comments.filter((c) => c.parentId === recipe.id),
        likeCount: (recipe, _args, _context, _info) => recipeLikes.filter((l) => l.recipeId === recipe.id).length,
        likes: (recipe, _args, _context, _info) =>
            recipeLikes
                .filter((l) => l.recipeId === recipe.id)
                .map((l) => ({
                    id: { recipeId: l.recipeId, userId: l.userId },
                    likedAt: l.likedAt,
                    recipe,
                    user: users.find((u) => u.id === l.userId),
                })),
    },

    // RecipeIngredient
    RecipeIngredient: {
        ingredient: (ri, _args, _context, _info) => ingredients.find((i) => i.id === ri.ingredientId) ?? null,
        recipe: (ri, _args, _context, _info) => recipes.find((r) => r.id === ri.recipeId) ?? null,
    },

    // RecipeStep
    RecipeStep: {
        recipe: (step, _args, _context, _info) => recipes.find((r) => r.id === step.recipeId) ?? null,
        comments: (step, _args, _context, _info) => comments.filter((c) => c.parentId === step.id),
    },

    // Comment
    Comment: {
        owner: (comment, _args, _context, _info) => users.find((u) => u.id === comment.ownerId) ?? null,
        parent: (comment, _args, _context, _info) => ({ id: comment.parentId, comments: [] }),
    },

    // RecipeLike
    RecipeLike: {
        recipe: (like, _args, _context, _info) => recipes.find((r) => r.id === like.id.recipeId) ?? null,
        user: (like, _args, _context, _info) => users.find((u) => u.id === like.id.userId) ?? null,
    },

    // Report
    Report: {
        reporter: (report, _args, _context, _info) => users.find((u) => u.id === report.reporterId) ?? null,
        target: (report, _args, _context, _info) => ({ id: report.targetId }),
        recipe: (report, _args, _context, _info) => report.targetType === "Recipe" ? recipes.find((r) => r.id === report.targetId) ?? null : null,
        recipeStep: (report, _args, _context, _info) => report.targetType === "RecipeStep" ? recipeSteps.find((s) => s.id === report.targetId) ?? null : null,
        user: (report, _args, _context, _info) => report.targetType === "User" ? users.find((u) => u.id === report.targetId) ?? null : null,
    },
};