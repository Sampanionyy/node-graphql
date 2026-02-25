import {
    users, ingredients, ingredientTypes,
    recipes, recipeTypes, recipeIngredients, recipeSteps,
    recipeLikes, comments, reports,
    newId, newBigInt,
} from "../data/db.js";

// ── Helpers ────────────────────────────────────────────────
const findById = (list, id) => list.find((x) => x.id == id) ?? null;

// ── Users ──────────────────────────────────────────────────
export const getUsers = () => users;
export const getUser = (id) => findById(users, id);

export const addUser = ({ email, firstName, lastName, password: _pw, pseudo, roles }) => {
    const user = {
        id: newId(),
        email,
        firstName,
        lastName,
        pseudo,
        roles: roles ?? ["STANDARD"],
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
    };
    users.push(user);
    return user;
};

// ── Ingredient Types ───────────────────────────────────────
export const getIngredientTypes = () => ingredientTypes;

// ── Ingredients ────────────────────────────────────────────
export const getIngredients = () => ingredients;
export const getIngredient = (id) => ingredients.find((i) => i.id === BigInt(id)) ?? null;

export const searchIngredients = ({ filter, sortBy } = {}) => {
    let result = [...ingredients];

    if (filter) {
        if (filter.name != null) result = result.filter((i) => i.name.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter.isPublic != null) result = result.filter((i) => i.isPublic === filter.isPublic);
        if (filter.isDeleted != null) result = result.filter((i) => i.isDeleted === filter.isDeleted);
        if (filter.ownerId != null) result = result.filter((i) => i.ownerId === filter.ownerId);
        if (filter.typeId != null) result = result.filter((i) => i.typeId === BigInt(filter.typeId));
        if (filter.typeName != null) {
            const type = ingredientTypes.find((t) => t.name.toLowerCase().includes(filter.typeName.toLowerCase()));
            if (type) result = result.filter((i) => i.typeId === type.id);
            else return [];
        }
    }

    if (sortBy?.length) {
        for (const { field, direction } of [...sortBy].reverse()) {
            result.sort((a, b) => {
                let va, vb;
                if (field === "NAME") { va = a.name; vb = b.name; }
                if (field === "CREATED_DATE") { va = a.createdDate; vb = b.createdDate; }
                const cmp = va < vb ? -1 : va > vb ? 1 : 0;
                return direction === "DESC" ? -cmp : cmp;
            });
        }
    }

    return result;
};

export const addIngredient = ({ name, description, imageFileName, isPublic, ownerId, typeId }) => {
    const ingredient = {
        id: newBigInt(),
        name,
        description,
        imageUrl: null,
        image_file_name: imageFileName ?? null,
        isPublic: isPublic ?? true,
        isDeleted: false,
        typeId: typeId ? BigInt(typeId) : null,
        ownerId: ownerId ?? null,
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
    };
    ingredients.push(ingredient);
    return ingredient;
};

// ── Recipe Types ───────────────────────────────────────────
export const getRecipeTypes = () => recipeTypes;

// ── Recipes ────────────────────────────────────────────────
export const getRecipes = () => recipes;
export const getRecipe = (id) => findById(recipes, id);

const matchIntFilter = (value, filter) => {
    if (!filter) return true;
    if (filter.eq != null && value !== filter.eq) return false;
    if (filter.gt != null && value <= filter.gt) return false;
    if (filter.gte != null && value < filter.gte) return false;
    if (filter.lt != null && value >= filter.lt) return false;
    if (filter.lte != null && value > filter.lte) return false;
    return true;
};

export const searchRecipes = ({ filter, sortBy } = {}) => {
    let result = [...recipes];

    if (filter) {
        if (filter.title != null) result = result.filter((r) => r.title.toLowerCase().includes(filter.title.toLowerCase()));
        if (filter.isPublic != null) result = result.filter((r) => r.is_public === filter.isPublic);
        if (filter.isDeleted != null) result = result.filter((r) => r.is_deleted === filter.isDeleted);
        if (filter.difficulty != null) result = result.filter((r) => r.difficulty === filter.difficulty);
        if (filter.language != null) result = result.filter((r) => r.language === filter.language);
        if (filter.ownerId != null) result = result.filter((r) => r.ownerId === filter.ownerId);
        if (filter.typeId != null) result = result.filter((r) => r.typeId === filter.typeId);
        if (filter.typeName != null) {
            const type = recipeTypes.find((t) => t.name.toLowerCase().includes(filter.typeName.toLowerCase()));
            if (type) result = result.filter((r) => r.typeId === type.id);
            else return [];
        }
        if (filter.tags?.length) result = result.filter((r) => filter.tags.every((tag) => r.tags.includes(tag)));
        if (filter.cookingTime) result = result.filter((r) => matchIntFilter(r.cooking_time, filter.cookingTime));
        if (filter.preparationTime) result = result.filter((r) => matchIntFilter(r.preparation_time, filter.preparationTime));
        if (filter.servingSize) result = result.filter((r) => matchIntFilter(r.servings_size, filter.servingSize));
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
                const map = {
                    TITLE: ["title", "title"],
                    COOKING_TIME: ["cooking_time", "cooking_time"],
                    PREPARATION_TIME: ["preparation_time", "preparation_time"],
                    CREATED_DATE: ["createdDate", "createdDate"],
                    LIKE_COUNT: [null, null],
                };
                let va, vb;
                if (field === "LIKE_COUNT") {
                    va = recipeLikes.filter((l) => l.recipeId === a.id).length;
                    vb = recipeLikes.filter((l) => l.recipeId === b.id).length;
                } else {
                    const [ka] = map[field];
                    va = a[ka]; vb = b[ka];
                }
                const cmp = va < vb ? -1 : va > vb ? 1 : 0;
                return direction === "DESC" ? -cmp : cmp;
            });
        }
    }

    return result;
};

// ── Comments ───────────────────────────────────────────────
export const getComments = () => comments;

export const addComment = ({ content, ownerId, recipeId }) => {
    const comment = {
        id: newId(),
        content,
        ownerId,
        parentId: recipeId,
        isPublic: true,
        isDeleted: false,
        reportCount: 0,
        createdAt: new Date().toISOString(),
    };
    comments.push(comment);
    return comment;
};

// ── Reports ────────────────────────────────────────────────
export const getReports = () => reports;

export const addReport = ({ message, reporterId, targetId, type }) => {
    const report = {
        id: newId(),
        message,
        reporterId,
        targetId,
        targetType: recipes.find((r) => r.id === targetId) ? "Recipe"
            : recipeSteps.find((s) => s.id === targetId) ? "RecipeStep"
                : users.find((u) => u.id === targetId) ? "User"
                    : "Unknown",
        type,
        resolved: false,
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
    };
    reports.push(report);
    return report;
};

// ── Sub-resolvers helpers (exported for resolver use) ──────
export { recipeIngredients, recipeSteps, recipeLikes, ingredientTypes, ingredients, users, recipes, recipeTypes, comments, reports };