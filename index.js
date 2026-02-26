import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { resolvers } from "./src/resolvers/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Lecture du schéma GraphQL depuis le fichier schema
const typeDefs = readFileSync(join(__dirname, "src/schema.graphql"), "utf-8");

// Création du serveur 
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Démarrage du serveur
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Apollo server sur ${url}`);