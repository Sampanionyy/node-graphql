import { reports, recipes, recipeSteps, users, newId } from "../data/db.js";

export const getReports = () => reports;

export const addReport = ({ message, reporterId, targetId, type }) => {
    const report = {
        id: newId(),
        message,
        reporterId,
        targetId,
        targetType: recipes.find((r) => r.id === targetId)      ? "Recipe"
                  : recipeSteps.find((s) => s.id === targetId)  ? "RecipeStep"
                  : users.find((u) => u.id === targetId)        ? "User"
                  : "Unknown",
        type,
        resolved: false,
        createdDate: new Date().toISOString().split("T")[0],
        updatedDate: new Date().toISOString().split("T")[0],
    };
    reports.push(report);
    return report;
};
