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
const resolvers = require('../resolvers/index');
const _ = require('lodash');
const moment = require('moment');

module.exports = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Customer: {
            type: new GraphQLList(customerType),
            args: { Ids: { type: new GraphQLList(GraphQLID) } },
            resolve: (parent, args) => {
                if (args.Ids) {
                    return resolvers.customer.getCustomersById(args.Ids);
                }
                return resolvers.customer.getAllCustomers();
            }
        },
        Vechile: {
            type: new GraphQLList(vechileType),
            args: { Vin: { type: new GraphQLList(GraphQLID) } },
            resolve: (parent, args) => {
                console.log(args.Vin);
                if (args.Vin) {
                    return resolvers.vechile.getVechilesByVin(args.Vin);
                }
                return resolvers.vechile.getAllVechiles();
            }
        },
        Booking: {
            type: new GraphQLList(bookingType),
            args: { bookingId: { type: GraphQLID }, bookingDate: { type: GraphQLString }, Vin: { type: GraphQLID } },
            resolve: (parent, args) => {
                let result = global.mockData.mockBooking;
                if (args.Vin) {
                    result = result.filter((booking) => {
                        return booking.vin === args.Vin;
                    });
                }
                if (args.bookingDate) {
                    result = result.filter((booking) => {
                        const bookingDate = moment(booking.bookingDate).format('YYYY-MM-DD');
                        return moment(args.bookingDate).isBetween(moment(bookingDate).subtract(1, 'days').format('YYYY-MM-DD'), moment(bookingDate).add(1, 'days').format('YYYY-MM-DD'));
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
