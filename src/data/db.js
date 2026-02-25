import { v4 as uuidv4 } from "uuid";

// --- Users ---
export const users = [
    {
        id: "u1",
        email: "alice@example.com",
        firstName: "Alice",
        lastName: "Martin",
        pseudo: "alice_cook",
        roles: ["STANDARD"],
        createdDate: "2024-01-10",
        updatedDate: "2024-06-01",
    },
    {
        id: "u2",
        email: "bob@example.com",
        firstName: "Bob",
        lastName: "Dupont",
        pseudo: "chef_bob",
        roles: ["MODERATOR"],
        createdDate: "2024-02-15",
        updatedDate: "2024-07-20",
    },
    {
        id: "u3",
        email: "admin@example.com",
        firstName: "Admin",
        lastName: "Root",
        pseudo: "admin",
        roles: ["ADMINISTRATOR"],
        createdDate: "2023-12-01",
        updatedDate: "2024-08-01",
    },
];

// --- Ingredient Types ---
export const ingredientTypes = [
    { id: 1n, name: "Vegetable", description: "Fresh vegetables", imageUrl: null, image_file_name: null },
    { id: 2n, name: "Fruit", description: "Fresh fruits", imageUrl: null, image_file_name: null },
    { id: 3n, name: "Meat", description: "Meat and poultry", imageUrl: null, image_file_name: null },
    { id: 4n, name: "Dairy", description: "Dairy products", imageUrl: null, image_file_name: null },
    { id: 5n, name: "Spice", description: "Herbs and spices", imageUrl: null, image_file_name: null },
    { id: 6n, name: "Grain", description: "Grains and cereals", imageUrl: null, image_file_name: null },
];

// --- Ingredients ---
export const ingredients = [
    {
        id: 1n,
        name: "Tomato",
        description: "Red tomato",
        imageUrl: null,
        image_file_name: null,
        isPublic: true,
        isDeleted: false,
        typeId: 1n,
        ownerId: "u1",
        createdDate: "2024-01-12",
        updatedDate: "2024-01-12",
    },
    {
        id: 2n,
        name: "Chicken",
        description: "Whole chicken",
        imageUrl: null,
        image_file_name: null,
        isPublic: true,
        isDeleted: false,
        typeId: 3n,
        ownerId: "u2",
        createdDate: "2024-02-20",
        updatedDate: "2024-02-20",
    },
    {
        id: 3n,
        name: "Parmesan",
        description: "Italian hard cheese",
        imageUrl: null,
        image_file_name: null,
        isPublic: true,
        isDeleted: false,
        typeId: 4n,
        ownerId: "u1",
        createdDate: "2024-03-05",
        updatedDate: "2024-03-05",
    },
    {
        id: 4n,
        name: "Basil",
        description: "Fresh basil leaves",
        imageUrl: null,
        image_file_name: null,
        isPublic: true,
        isDeleted: false,
        typeId: 5n,
        ownerId: "u2",
        createdDate: "2024-03-10",
        updatedDate: "2024-03-10",
    },
    {
        id: 5n,
        name: "Pasta",
        description: "Dried pasta",
        imageUrl: null,
        image_file_name: null,
        isPublic: true,
        isDeleted: false,
        typeId: 6n,
        ownerId: "u1",
        createdDate: "2024-04-01",
        updatedDate: "2024-04-01",
    },
];

// --- Recipe Types ---
export const recipeTypes = [
    { id: "rt1", name: "Italian" },
    { id: "rt2", name: "French" },
    { id: "rt3", name: "Asian" },
    { id: "rt4", name: "Dessert" },
];

// --- Recipe Ingredients ---
export const recipeIngredients = [
    { id: "ri1", recipeId: "r1", ingredientId: 1n, quantity: 3, quantity_type: "UNIT", ingredient_state: "SLICED", note: "thinly sliced", required: true },
    { id: "ri2", recipeId: "r1", ingredientId: 3n, quantity: 50, quantity_type: "G", ingredient_state: "GRATED", note: null, required: true },
    { id: "ri3", recipeId: "r1", ingredientId: 5n, quantity: 200, quantity_type: "G", ingredient_state: "WHOLE", note: null, required: true },
    { id: "ri4", recipeId: "r2", ingredientId: 2n, quantity: 1, quantity_type: "UNIT", ingredient_state: "WHOLE", note: "cleaned", required: true },
    { id: "ri5", recipeId: "r2", ingredientId: 4n, quantity: 2, quantity_type: "TBSP", ingredient_state: "FRESH", note: null, required: false },
];

// --- Recipe Steps ---
export const recipeSteps = [
    { id: "rs1", recipeId: "r1", step_number: 1, step_description: "Boil pasta in salted water for 10 minutes." },
    { id: "rs2", recipeId: "r1", step_number: 2, step_description: "Slice tomatoes and set aside." },
    { id: "rs3", recipeId: "r1", step_number: 3, step_description: "Mix pasta with tomatoes and top with parmesan." },
    { id: "rs4", recipeId: "r2", step_number: 1, step_description: "Preheat oven to 200°C." },
    { id: "rs5", recipeId: "r2", step_number: 2, step_description: "Season the chicken and roast for 1h15min." },
];

// --- Recipe Likes ---
export const recipeLikes = [
    { recipeId: "r1", userId: "u2", likedAt: "2024-05-01T10:00:00Z" },
    { recipeId: "r1", userId: "u3", likedAt: "2024-05-02T11:00:00Z" },
    { recipeId: "r2", userId: "u1", likedAt: "2024-06-10T09:00:00Z" },
];

// --- Recipes ---
export const recipes = [
    {
        id: "r1",
        title: "Pasta Pomodoro",
        description: "A simple Italian classic.",
        author_note: "Use San Marzano tomatoes for best results.",
        cooking_time: 10,
        preparation_time: 15,
        difficulty: "EASY",
        language: "en",
        servings_size: 2,
        tags: ["italian", "vegetarian", "quick"],
        image_file_name: null,
        is_public: true,
        is_deleted: false,
        createdDate: "2024-04-15",
        updatedDate: "2024-04-20",
        ownerId: "u1",
        typeId: "rt1",
    },
    {
        id: "r2",
        title: "Roast Chicken",
        description: "A classic French roast chicken.",
        author_note: "Rest the chicken 10 min before serving.",
        cooking_time: 75,
        preparation_time: 20,
        difficulty: "MEDIUM",
        language: "en",
        servings_size: 4,
        tags: ["french", "chicken", "sunday"],
        image_file_name: null,
        is_public: true,
        is_deleted: false,
        createdDate: "2024-05-01",
        updatedDate: "2024-05-05",
        ownerId: "u2",
        typeId: "rt2",
    },
];

// --- Comments ---
export const comments = [
    {
        id: "c1",
        content: "Delicious and easy!",
        ownerId: "u2",
        parentId: "r1",
        isPublic: true,
        isDeleted: false,
        reportCount: 0,
        createdAt: "2024-05-03T14:00:00Z",
    },
    {
        id: "c2",
        content: "My family loved this recipe.",
        ownerId: "u1",
        parentId: "r2",
        isPublic: true,
        isDeleted: false,
        reportCount: 0,
        createdAt: "2024-06-12T09:30:00Z",
    },
];

// --- Reports ---
export const reports = [
    {
        id: "rep1",
        message: "This recipe contains incorrect information.",
        reporterId: "u1",
        targetId: "r2",
        targetType: "Recipe",
        type: "MISINFORMATION",
        resolved: false,
        createdDate: "2024-07-01",
        updatedDate: "2024-07-01",
    },
];

// --- Helpers to generate IDs ---
export const newId = () => uuidv4();
export const newBigInt = () => BigInt(Date.now());