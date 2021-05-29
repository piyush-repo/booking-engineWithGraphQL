const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
const customerType = require('./customer');
const vechileType = require('./vechile');
const _ = require('lodash');

module.exports = new GraphQLObjectType({
    name: "Booking",
    fields: {
        bookingId: { type: GraphQLID },
        bookingHrs: { type: GraphQLInt },
        bookingDate: { type: GraphQLString},
        customerId: { type: GraphQLInt },
        vin: { type: GraphQLInt },
        customer: {
            type: customerType,
            resolve:(parent, args)=>{
                return _.find(global.mockData.mockCustomer, {id: parent.customerId});
            }
        },
        vechile: {
            type: vechileType,
            resolve: (parent, args)=>{
                return _.find(global.mockData.mockVechile, {Vin: parent.vin});
            }
        }
    }
});