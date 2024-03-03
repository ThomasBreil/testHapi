'use strict';

const { Service } = require('@hapipal/schmervice');
const Encrypt = require('../modules/iut-encrypt');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');



module.exports = class UserService extends Service {
    generateToken( user ) {
        return Jwt.token.generate(
            {
                aud: 'urn:audience:iut',
                iss: 'urn:issuer:iut',
                id: user.id,
                email: user.email,
                scope: user.scope //Le scope du user
            },
            {
                key: 'random_string', // La clé qui est définit dans lib/auth/strategies/jwt.js
                algorithm: 'HS512'
            },
            {
                ttlSec: 14400 // 4 hours
            }
        );
    }

    async create(user) {

        const { User } = this.server.models();
        const MailService = require('./mailer.js'); // Assurez-vous que le chemin est correct

        // Initialisation du service de messagerie
        const mailService = new MailService();
        user.password = Encrypt.sha1(user.password);
        try {
            const newUser = await User.query().insertAndFetch(user);
            mailService.sendWelcomeMail(newUser);
            return newUser;
        } catch (err) {
            throw Boom.conflict(err.message);
        }


    }
    find() {

        const { User } = this.server.models();

        return User.query();
    }
    update(id, user) {

        const { User } = this.server.models();
        if (user.password) {
            user.password = Encrypt.sha1(user.password);
        }

        return User.query().patchAndFetchById(id, user)
            .then((updated) => {

                if (!updated) {
                    throw Boom.notFound('User not found');
                }

                return updated;
            });
    }
    async login(email,password) {
        const { User } = this.server.models();
        password = Encrypt.sha1(password);
        console.log(email, password);
        const user = await User.query().findOne({ email, password });
        if (user) {
            return { login: 'succesful', token: this.generateToken(user) };
        }

        throw Boom.unauthorized('Invalid email or password');
    }
    delete(id) {

        const { User } = this.server.models();
        return User.query().deleteById(id)
            .then((deleted) => {

                if (!deleted) {
                    throw Boom.notFound('User not found');
                }

                return deleted;
            });
    }
};
