const _ = require('lodash');
module.exports = {
    getCustomersById: (Ids) => {
        return _.filter(global.mockData.mockCustomer, (customer) => Ids.indexOf(customer.Id.toString()) > -1);
    },
    getAllCustomers: () => {
        return global.mockData.mockCustomer;
    }
}