const application = require('./app');
const app = new application();
app.initMiddlewares().then(() => {
    app.run(3000);
});