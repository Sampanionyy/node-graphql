import { getUsers, getUser, addUser } from "../services/user.service.js";
import {
    getIngredients, getIngredient, getIngredientTypes,
    searchIngredients, addIngredient
} from "../services/ingredient.service.js";
import { getRecipes, getRecipe, getRecipeTypes, searchRecipes } from "../services/recipe.service.js";
import { getComments, addComment } from "../services/comment.service.js";
import { getReports, addReport } from "../services/report.service.js";

import { scalarResolvers } from "./scalars.js";
import { userTypeResolver } from "./user.resolver.js";
import { ingredientTypeResolver } from "./ingredient.resolver.js";
import { recipeTypeResolver } from "./recipe.resolver.js";
import { reportTypeResolver } from "./report.resolver.js";

export const resolvers = {
    ...scalarResolvers,

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
    ...userTypeResolver,
    ...ingredientTypeResolver,
    ...recipeTypeResolver,
    ...reportTypeResolver,
};