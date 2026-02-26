import { ingredients, ingredientTypes, newBigInt } from "../data/db.js";

export const getIngredients = () => ingredients;

export const getIngredient = (id) => ingredients.find((i) => i.id === BigInt(id)) ?? null;

export const getIngredientTypes = () => ingredientTypes;

export const searchIngredients = ({ filter, sortBy } = {}) => {
    let result = [...ingredients];

    if (filter) {
        if (filter.name != null)      result = result.filter((i) => i.name.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter.isPublic != null)  result = result.filter((i) => i.isPublic === filter.isPublic);
        if (filter.isDeleted != null) result = result.filter((i) => i.isDeleted === filter.isDeleted);
        if (filter.ownerId != null)   result = result.filter((i) => i.ownerId === filter.ownerId);
        if (filter.typeId != null)    result = result.filter((i) => i.typeId === BigInt(filter.typeId));
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
                if (field === "NAME")         { va = a.name;        vb = b.name; }
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
