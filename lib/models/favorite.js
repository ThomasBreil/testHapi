'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {

        return 'favorites';
    }

    static get joiSchema() {

        return Joi.object({
            user_id: Joi.number().required().integer().greater(0).description('ID of the user'),
            movie_id: Joi.number().required().integer().greater(0).description('ID of the movie')
        });
    }

    $beforeInsert(queryContext) {
        this.createdAt = this.updatedAt;
    }
};
