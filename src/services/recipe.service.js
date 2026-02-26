import { recipes, recipeTypes, recipeIngredients, recipeLikes, ingredients, newId } from "../data/db.js";

export const getRecipes = () => recipes;

export const getRecipe = (id) => recipes.find((r) => r.id === id) ?? null;

export const getRecipeTypes = () => recipeTypes;

const matchIntFilter = (value, filter) => {
    if (!filter) return true;
    if (filter.eq  != null && value !== filter.eq)  return false;
    if (filter.gt  != null && value <= filter.gt)   return false;
    if (filter.gte != null && value <  filter.gte)  return false;
    if (filter.lt  != null && value >= filter.lt)   return false;
    if (filter.lte != null && value >  filter.lte)  return false;
    return true;
};

export const searchRecipes = ({ filter, sortBy } = {}) => {
    let result = [...recipes];

    if (filter) {
        if (filter.title != null)      result = result.filter((r) => r.title.toLowerCase().includes(filter.title.toLowerCase()));
        if (filter.isPublic != null)   result = result.filter((r) => r.is_public === filter.isPublic);
        if (filter.isDeleted != null)  result = result.filter((r) => r.is_deleted === filter.isDeleted);
        if (filter.difficulty != null) result = result.filter((r) => r.difficulty === filter.difficulty);
        if (filter.language != null)   result = result.filter((r) => r.language === filter.language);
        if (filter.ownerId != null)    result = result.filter((r) => r.ownerId === filter.ownerId);
        if (filter.typeId != null)     result = result.filter((r) => r.typeId === filter.typeId);
        if (filter.typeName != null) {
            const type = recipeTypes.find((t) => t.name.toLowerCase().includes(filter.typeName.toLowerCase()));
            if (type) result = result.filter((r) => r.typeId === type.id);
            else return [];
        }
        if (filter.tags?.length)         result = result.filter((r) => filter.tags.every((tag) => r.tags.includes(tag)));
        if (filter.cookingTime)          result = result.filter((r) => matchIntFilter(r.cooking_time, filter.cookingTime));
        if (filter.preparationTime)      result = result.filter((r) => matchIntFilter(r.preparation_time, filter.preparationTime));
        if (filter.servingSize)          result = result.filter((r) => matchIntFilter(r.servings_size, filter.servingSize));
        if (filter.ingredientIds?.length) {
            const ids = filter.ingredientIds.map(BigInt);
            result = result.filter((r) => {
                const riIds = recipeIngredients.filter((ri) => ri.recipeId === r.id).map((ri) => ri.ingredientId);
                return ids.every((id) => riIds.some((rid) => rid === id));
            });
        }
        if (filter.ingredientNames?.length) {
            result = result.filter((r) => {
                const riIds = recipeIngredients.filter((ri) => ri.recipeId === r.id).map((ri) => ri.ingredientId);
                const riIngredients = riIds.map((id) => ingredients.find((i) => i.id === id)).filter(Boolean);
                return filter.ingredientNames.every((name) =>
                    riIngredients.some((i) => i.name.toLowerCase().includes(name.toLowerCase()))
                );
            });
        }
    }

    if (sortBy?.length) {
        for (const { field, direction } of [...sortBy].reverse()) {
            result.sort((a, b) => {
                let va, vb;
                if (field === "LIKE_COUNT") {
                    va = recipeLikes.filter((l) => l.recipeId === a.id).length;
                    vb = recipeLikes.filter((l) => l.recipeId === b.id).length;
                } else {
                    const fieldMap = { TITLE: "title", COOKING_TIME: "cooking_time", PREPARATION_TIME: "preparation_time", CREATED_DATE: "createdDate" };
                    va = a[fieldMap[field]];
                    vb = b[fieldMap[field]];
                }
                const cmp = va < vb ? -1 : va > vb ? 1 : 0;
                return direction === "DESC" ? -cmp : cmp;
            });
        }
    }

    return result;
};
