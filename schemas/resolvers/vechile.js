
module.exports = {
    getVechilesByVin: (Vin) => {
        return global.mockData.mockVechile.filter((vechile) => {
            return Vin.indexOf(vechile.Vin.toString()) > -1;
        });
    },
    getAllVechiles: () => {
        return global.mockData.mockVechile;
    }
}