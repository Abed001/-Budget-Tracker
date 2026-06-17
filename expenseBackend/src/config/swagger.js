const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Budget Tracker API',
            version: '1.0.0',
            description: 'API documentation for the Budget Tracker app',
        },
        servers: [{ url: 'http://localhost:3001' }],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);