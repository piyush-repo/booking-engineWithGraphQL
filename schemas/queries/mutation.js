const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLID,
    GraphQLError,
    GraphQL
} = require('graphql');
const moment = require('moment');
const constants = require('../../config/constants.json');
const bookingType = require('../booking');
const _ = require('lodash');
const { constant } = require('lodash');
const { v4: uuidv4 } = require('uuid');

const customerInputType = new GraphQLInputObjectType({
    name: "customerInput",
    fields: {
        id: { type: GraphQLID },
        CustomerName: { type: GraphQLString },
        CustomerEmail: { type: GraphQLString },
        CustomerPhoneNumber: { type: GraphQLInt }
    }
});

const vechileInputType = new GraphQLInputObjectType({
    name: "vechileInput",
    fields: {
        Make: { type: GraphQLString },
        Model: { type: GraphQLString },
        Vin: { type: GraphQLInt }
    }
});

const createBookingType = new GraphQLInputObjectType({
    name: 'creatingBookingType',
    fields: {
        customer: {
            type: new GraphQLNonNull(customerInputType)
        },
        vechile: {
            type: new GraphQLNonNull(vechileInputType)
        },
        bookingDate: {
            type: new GraphQLNonNull(GraphQLString)
        },

    }
})

function validateBookingDate(records) {
    let isValid = true;
    if (records.length) {
        records.forEach((record) => {
            const bookingDate = moment(record.bookingDate);
            const currentDateOpenTime = `${bookingDate.format('YYYY-MM-DD')} ${constants.store.openTime}`;
            const currentDateCloseTime = `${bookingDate.format('YYYY-MM-DD')} ${constants.store.closeTime}`;
            if (!bookingDate.isBetween(currentDateOpenTime, currentDateCloseTime)) {
                isValid = false;
            }
            else {
                isValid = true;
            }
        })
    }
    return isValid;
}

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBooking: {
            type: new GraphQLList(bookingType),
            args: {
                input: { type: new GraphQLList(createBookingType) }
            },
            resolve: (parent, args) => {
                console.log("mutation");
                console.log(JSON.stringify(args.input[0]));
                if (!args.input.length) {
                    return new GraphQLError("Please provide booking details");
                }
                if (args.input.length && args.input.length > constants.bookingCapacity) {
                    return new GraphQLError("Maximum allowed booking capacity is 2")
                }
                if (!validateBookingDate(args.input)) {
                    return new GraphQLError(`Unable to book as allowed booking time is ${constants.store.openTime}AM to ${constants.store.closeTime}PM`);
                }
                const response = [];
                args.input.forEach(record => {
                    const customer = _.find(global.mockData.mockCustomer, { CustomerName: record.customer.CustomerName });
                    const vechile = _.find(global.mockData.mockVechile, { Vin: record.vechile.Vin });
                    const payload = {
                        "bookingId": uuidv4(),
                        "bookingDate": moment(record.bookingDate).format(),
                        "bookingHrs": 2,
                        "customerId": customer.Id,
                        "vin": vechile.Vin
                    };
                    global.mockData.mockBooking.push(payload);
                    response.push(payload);
                });
                return response;
            }
        }
    }
});


