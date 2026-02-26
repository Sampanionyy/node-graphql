import { comments, newId } from "../data/db.js";

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
