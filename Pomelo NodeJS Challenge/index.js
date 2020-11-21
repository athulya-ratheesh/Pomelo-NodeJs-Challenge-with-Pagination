'use strict';

const Hapi = require('@hapi/hapi');
const parentService = require('./src/parentService');
require('dotenv').config();
const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    server.route({
        method: 'GET',
        path: '/parent',
        handler: (request, h) => {
            let pageNum = request && request.query && request.query.page ? request.query.page : process.env.PageNum;
            const parent = parentService.processChildMapping(pageNum);
            return parent;
        },
        config: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            }
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();