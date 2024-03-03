'use strict';

const Joi = require('joi');

module.exports = [{
    method: 'post',
    path: '/user',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                firstName: Joi.string().required().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().required().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().required().min(3).description('Username of the user'),
                email: Joi.string().required().email().description('Email of the user'),
                password: Joi.string().required().min(8).description('Password of the user') })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.create(request.payload);
    }
},{
    method: 'delete',
    path: '/user/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().min(1).example(1).description('Id of the user')
            })
        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.delete(request.params.id);
    }
},{
    method: 'patch',
    path: '/user/{id}',
    options: {
        auth: {
            scope: [ 'admin' ]
        },
        tags: ['api'],
        validate: {
            params: Joi.object({
                id: Joi.number().required().min(1).example(1).description('Id of the user')
            }),
            payload: Joi.object({
                firstName: Joi.string().min(3).example('John').description('Firstname of the user'),
                lastName: Joi.string().min(3).example('Doe').description('Lastname of the user'),
                username: Joi.string().min(3).description('Username of the user'),
                password: Joi.string().min(8).description('Password of the user') ,
                scope: Joi.string().valid('admin','user').description('The scope of the user') }
            ).or('firstName', 'lastName', 'username', 'password','scope').required().min(1).description('At least one of the fields is required')

        }
    },
    handler: async (request, h) => {

        const { userService } = request.services();

        return await userService.update(request.params.id, request.payload);
    }
}, {
    method: 'post',
    path: '/user/login',
    options: {
        auth: false,
        tags: ['api'],
        validate: {
            payload: Joi.object({
                email: Joi.string().email().required().example('email@email.com').description('Email of the user'),
                password: Joi.string().min(8).required().description('Password of the user') })

        }
    },
    handler: async (request, h) => {
        const { userService } = request.services();

        return await userService.login(request.payload.email, request.payload.password);
    }
}

];
