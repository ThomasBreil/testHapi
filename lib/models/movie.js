'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Movies extends Model {

    static get tableName() {

        return 'movies';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            name: Joi.string().min(3).example('Film').description('Name of the film'),
            director: Joi.string().min(3).example('Director').description('Director of the film'),
            genre: Joi.string().min(3).example('Genre').description('Genre of the film'),
            releaseDate: Joi.date().description('Release date of the film'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }

};
