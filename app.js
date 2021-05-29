'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { graphqlHTTP }= require('express-graphql');
const schema = require('./schemas/queries/index');
const { mockCustomer, mockVechile, mockBooking } = require('./mockData/index');
global.mockData = { mockCustomer, mockVechile, mockBooking };

process.setMaxListeners(0);

class Application {
    constructor() {
        this.expressApp = express();
        this.server = null;
        this.expressAppHandler = null;
    }

    initMiddlewares() {
        this.registerOnShutdown();
        this.expressApp.enable('trust proxy');
        this.expressApp.disable('x-powered-by');
        const jsonParser = bodyParser.json({ limit: 1024 * 1024 * 1024 * 2, type: 'application/json' });
        this.expressApp.use(jsonParser);
        this.expressApp.use(
            '/graphql',
            graphqlHTTP({
                schema,
                graphiql: true
            }),
        );
        return Promise.resolve(true);
    }

    gracefulShutdown() {
        console.log('Received kill signal, shutting down gracefully.');
        process.exit();
    }

    registerOnShutdown() {
        // listen for TERM signal .e.g. kill
        process.on('SIGTERM', this.gracefulShutdown);

        // listen for INT signal e.g. Ctrl-C
        process.on('SIGINT', this.gracefulShutdown);
    }

    run(port) {
        this.expressApp.set('port', port);
        this.server = http.createServer(this.expressApp);
        console.log('Starting service on ' + port);
        this.expressAppHandler = this.server.listen(port);
    }
}

module.exports = Application;