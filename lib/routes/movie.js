'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/movie',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            payload: Joi.object({
                name: Joi.string().required().min(3).example('John').description('Name of the movie'),
                director: Joi.string().required().min(3).example('Director').description('Director of the film'),
                genre: Joi.string().required().min(3).example('Genre').description('Genre of the film'),
                releaseDate: Joi.date().required().description('Release date of the film') })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.create(request.payload);
    }
},{
    method: 'delete',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().min(1).example(1).description('Id of the film')
            })
        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.delete(request.params.id);
    }
},{
    method: 'patch',
    path: '/movie/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().min(1).example(1).description('Id of the movie')
            }),
            payload: Joi.object({
                name: Joi.string().min(3).example('John').description('Name of the movie'),
                director: Joi.string().min(3).example('Director').description('Director of the film'),
                genre: Joi.string().min(3).example('Genre').description('Genre of the film'),
                releaseDate: Joi.date().description('Release date of the film') }
            ).or('name', 'director', 'genre', 'releaseDate').required().min(1).description('At least one of the fields is required')

        }
    },
    handler: async (request, h) => {

        const { movieService } = request.services();

        return await movieService.update(request.params.id, request.payload);
    }
},{
    method: 'get',
    path: '/movies',
    options: {
        auth: {
            scope: [ 'admin','user' ]
        },
        tags: ['api']
    },
    // eslint-disable-next-line @hapi/hapi/scope-start
    handler: async (request, h) => {
        const { movieService } = request.services();

        return await movieService.getAll(request);
    }
}

];
