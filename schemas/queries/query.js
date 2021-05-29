const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLError
} = require('graphql');
const customerType = require('../customer');
const vechileType = require('../vechile');
const bookingType = require('../booking');
const _ = require('lodash');

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Customer: {
            type: new GraphQLList(customerType),
            args: { Ids: { type: new GraphQLList(GraphQLID) } },
            resolve: (parent, args) => {
                if (args.Ids) {
                    return _.filter(global.mockData.mockCustomer, (customer) => args.Ids.indexOf(customer.id.toString()) > -1);
                }
                return global.mockData.mockCustomer;
            }
        },
        Vechile: {
            type: new GraphQLList(vechileType),
            args: { Vin: { type: new GraphQLList(GraphQLID) } },
            resolve: (parent, args) => {
                console.log(args.Vin);
                if(args.Vin){
                    return global.mockData.mockVechile.filter((vechile) => {
                        return args.Vin.indexOf(vechile.Vin.toString()) > -1;
                    });
                }
                return global.mockData.mockVechile;
            }
        },
        Booking: {
            type: new GraphQLList(bookingType),
            args: { bookingId: { type: GraphQLID }, bookingDate: { type: GraphQLString }, Vin: { type: GraphQLID } },
            resolve: (parent, args) => {
                let result = global.mockData.mockBooking;
                if (args.Vin) {
                    result = result.filter((booking) => {
                        return booking.vin === parseInt(args.Vin)
                    })
                }
                if (args.bookingDate) {
                    result = result.filter((booking) => {
                        const date1 = new Date(booking.bookingDate);
                        const date2 = new Date(args.bookingDate);
                        return +date1 === +date2;
                    });
                }
                if (args.bookingId) {
                    console.log("bookingId");
                    console.log(typeof (args.bookingId))
                    result = result.filter((booking) => {
                        return booking.bookingId === parseInt(args.bookingId);
                    });
                }
                return result;
            }
        }
    }
});
