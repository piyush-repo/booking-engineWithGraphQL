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

const constants = require('../../config/constants.json');
const bookingType = require('../booking');
const _ = require('lodash');

const customerInputType = new GraphQLInputObjectType({
    name: "customerInput",
    fields: {
        id: { type: GraphQLID },
        CustomerName: { type: GraphQLString },
        CustomerEmail: { type: GraphQLString},
        CustomerPhoneNumber: { type: GraphQLInt}
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
        customer : {
            type : new GraphQLNonNull(customerInputType)
        },
        vechile: {
            type: new GraphQLNonNull(vechileInputType)
        },
        // customerName: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        // customerPhoneNo: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        // customerEmail: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        // vechileMake: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        // vechileModel: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        // vechileVin: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        bookingDate: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }
})


module.exports =  new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBooking: {
            type: bookingType,
            args: {
                input: {type: new GraphQLList(createBookingType)}
            },
            resolve: (parent, args) => {
                console.log("mutation");
                console.log(JSON.stringify(args.input[0]));
                if(args.input.length > constants.bookingCapacity){
                    return new GraphQLError("Maximum allowed booking capacity is 2")
                }
            }
        }
    }
});


