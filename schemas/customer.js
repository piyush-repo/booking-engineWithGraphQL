const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: "Customer",
    fields: {
        id: { type: GraphQLID },
        CustomerName: { type: GraphQLString },
        CustomerEmail: { type: GraphQLString},
        CustomerPhoneNumber: { type: GraphQLInt}
    }
});