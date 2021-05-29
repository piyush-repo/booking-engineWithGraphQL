const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: "Vechile",
    fields: {
        Make: { type: GraphQLString },
        Model: { type: GraphQLString },
        Vin: { type: GraphQLString }
    }
});