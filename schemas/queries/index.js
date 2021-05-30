const { GraphQLSchema } = require('graphql');
const rootQuery = require('./query');
const mutationQuery = require('./mutation');

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation: mutationQuery
});