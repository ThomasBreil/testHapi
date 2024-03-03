'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const MailService = require('./mailer');

const MessageBrokerService = require('./messagebroker');
const Encrypt = require('../modules/iut-encrypt');




module.exports = class MovieService extends Service {
    async create(movie) {

        const { Movies,User } = this.server.models();
        try {
            const mailService = new MailService();
            const users = await User.query();
            console.log(users);
            const newMovie = await Movies.query().insertAndFetch(movie);
            users.forEach((user) => {
                mailService.sendNewMovieEmail(movie, user);
            });
            return newMovie;
        }
        catch (err) {
            throw Boom.conflict(err.message);
        }
    }
    async getAll(request) {
        try {
            const messageBroker = new MessageBrokerService();
            const { Movies } = this.server.models();
            const user = request.auth.credentials;
            const movies =  await Movies.query();
            console.log('oskour');
            await messageBroker.sendToQueue(movies);
            await messageBroker.consumeQueue(user);
            return movies;
        } catch (err) {
            throw Boom.conflict(err.message);
        }
    }


    async update(id, movie) {
        try {
            const { Movies, User } = this.server.models();
            const mailService = new MailService();
            const users = await User.query()
                .join('favorites', 'id', 'user_id')
                .where('movie_id', id);
            console.log(users);
            return await Movies.query().patchAndFetchById(id, movie)
                .then((updated) => {

                    if (!updated) {
                        throw Boom.notFound('Movie not found');
                    }

                    users.forEach((user) => {
                        mailService.sendUpdateMovieEmail(movie, user);
                    });

                    return updated;
                });
        }
        catch (err) {
            throw Boom.conflict(err.message);
        }
    }
    delete(id) {

        const { Movies } = this.server.models();
        return Movies.query().deleteById(id)
            .then((deleted) => {

                if (!deleted) {
                    throw Boom.notFound('Movie not found');
                }

                return deleted;
            });
    }
};
