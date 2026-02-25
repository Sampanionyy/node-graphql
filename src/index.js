import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import fs from "fs";
import resolers from './resolvers/index.js';

const typeDefs = fs.readFileSync("./src/schema.graphql", "utf-8");

const server = new ApolloServer({
    typeDefs,
    resolvers: resolers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`Server running at port ${url}`);