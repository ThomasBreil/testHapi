'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/favorite/{movieId}',
    options: {
        auth: {
            scope: [ 'user','admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                movieId: Joi.number().required().min(1).example(1).description('Id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.add(request);
    }
},{
    method: 'delete',
    path: '/favorite/{movieId}',
    options: {
        auth: {
            scope: [ 'user','admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                movieId: Joi.number().required().min(1).example(1).description('Id of the movie')
            })
        }
    },
    handler: async (request, h) => {

        const { favoriteService } = request.services();

        return await favoriteService.remove(request);
    }
}

];
