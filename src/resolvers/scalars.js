export const scalarResolvers = {
    BigInteger: {
        serialize:    (value) => value?.toString() ?? null,
        parseValue:   (value) => BigInt(value),
        parseLiteral: (ast)   => BigInt(ast.value),
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
