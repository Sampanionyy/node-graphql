export const scalarResolvers = {
    BigInteger: {
        serialize:    (value) => value?.toString() ?? null, // quand le serveur renvoie une réponse GraphQL -> toString()
        parseValue:   (value) => BigInt(value), // quand le client envoie une requête GraphQL -> BigInt()
        parseLiteral: (ast)   => BigInt(ast.value), // quand le client envoie une requête GraphQL avec une valeur littérale -> BigInt()
    },
    Date: {
        serialize:    (value) => value,
        parseValue:   (value) => value,
        parseLiteral: (ast)   => ast.value,
    },
    DateTime: {
        serialize:    (value) => value,
        parseValue:   (value) => value,
        parseLiteral: (ast)   => ast.value,
    },
    BigDecimal: {
        serialize:    (value) => value,
        parseValue:   (value) => parseFloat(value),
        parseLiteral: (ast)   => parseFloat(ast.value),
    },
};
