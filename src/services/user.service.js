import { users, newId } from "../data/db.js";

export const getUsers = () => users;

export const getUser = (id) => users.find((u) => u.id === id) ?? null;

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
