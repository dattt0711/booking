

const cors = require('cors');

const express = require('express');
const path = require('path');
// const {config} = require('./configs/configEnvSchema');

const app = express();
const http = require('http');
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || '5000');

server.listen(port, () => {
    console.log(`App is listening at ${port}`);
});
// const origin = config.ORIGIN.split(',');
const corsOptions = {
    // origin: origin,
    methods: ['OPTIONS', 'GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: [
        'Origin',
        'Content-Type',
        'Accept',
        'x-access-token',
        'x-auth-token',
        'x-xsrf-token',
        'authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.get("/", async (request, response) => {
    response.send("Ok!")
});

app.use(express.static(path.join(__dirname, 'public')));
require('./configs/database');
require('./configs/configInit')(app);
require('./configs/configRoutes')(app);


module.exports = app;
