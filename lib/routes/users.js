'use strict';

const Joi = require('joi');

module.exports = {
    method: 'get',
    path: '/users',
    options: {
        auth: {
            scope: [ 'admin','user' ]
        },
        tags: ['api']
    },
    // eslint-disable-next-line @hapi/hapi/scope-start
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.find();
    }
};
