'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');


const nodemailer = require('nodemailer');


module.exports = class favoriteService extends Service {


    async add(request) {
        try {
            const { Favorite } = this.server.models();
            const movieId = request.params.movieId;

            const userId = request.auth.credentials.id;
            const favorite = await Favorite.query().insert({
                user_id: userId,
                movie_id: movieId
            });

            return await favorite;
        }
        catch (err) {
            throw Boom.conflict('Movie dont exist or is already in your favorites list');
        }
    }
    async remove(request) {
        try {
            const { Favorite } = this.server.models();
            const movieId = request.params.movieId;
            const userId = request.auth.credentials;
            const favorite = await Favorite.query()
                .where({
                    user_id: userId,
                    movie_id: movieId
                })
                .first()
                .throwIfNotFound()
                .del()
                .then(() => {
                    return '';
                });
            return favorite;
        }
        catch (err) {
            throw Boom.conflict('Movie not found in your favorites list');
        }
    }
    async findUsersOfFavoriteMovie(request) {
        try {
            const { Favorite } = this.server.models();
            const movieId = request.params.movieId;
            const users = await Favorite.relatedQuery('users').for(movieId);
            return users;
        } catch (err) {
            throw Boom.conflict('Movie not found in your favorites list');
        }
    }





};
