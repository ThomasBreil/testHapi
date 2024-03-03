'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');


const nodemailer = require('nodemailer');

const Csv = require('fast-csv');
const { createWriteStream } = require('fs');

const { createObjectCsvWriter: createCsvWriter } = require('csv-writer');


module.exports = class MailService extends Service {


    setTransporter() {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER, // generated ethereal user
                pass: process.env.SMTP_PASS // generated ethereal password
            }, tls: {
                ciphers: 'SSLv3'
            }
        });
        return transporter;
    }

    async sendWelcomeMail(user) {
        const transporter = await this.setTransporter();
        const info = await transporter.sendMail({
            from: '"WelcomeFilm" <welcomefilm@film.film>', // sender address
            to: user.email, // list of receivers
            subject: 'Welcome !', // Subject line
            text: `Salut ${user.firstName}, Bienvenue chef !`,// plain text body
            html: `<b>Salut ${user.firstName}, Bienvenue chef !</b>` // html body
        });

        console.log('Message sent: %s', info.messageId);
    }

    async sendNewMovieEmail(movie, user) {
        try {
            const transporter = await this.setTransporter();
            const info = await transporter.sendMail({
                from: '"NewFilm" <welcomefilm@film.film>', // sender address
                to: user.email, // list of receivers
                subject: 'New Movie !', // Subject line
                text: `Salut ${user.firstName}, Un nouveau film est disponible : ${movie.name}`,// plain text body
                html: `<b>Salut ${user.firstName}, Un nouveau film est disponible : ${movie.name}</b>` // html body
            });
            console.log('Message sent: %s', info.messageId);
        } catch (err) {
            throw Boom.conflict(err.message);
        }
    }

    async sendUpdateMovieEmail(movie, user) {
        try {
            const transporter = await this.setTransporter();
            const info = await transporter.sendMail({
                from: '"UpdateFilm" <welcomefilm@film.film>', // sender address
                to: user.email, // list of receivers
                subject: 'Update Movie !', // Subject line
                text: `Attention ${user.firstName}!  Un film a été modifié : ${movie.name}`,// plain text body
                html: `<b>Salut ${user.firstName}, Un film a été modifié : ${movie.name}</b>` // html body
            });
        } catch (err) {
            throw Boom.conflict(err.message);
        }
    }

    async convertToCSV(data) {
        const csvRows = [];

        // En-têtes CSV
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Valeurs des données
        for (const row of data) {
            const values = headers.map((header) => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return await csvRows.join('\n');
    }
    // eslint-disable-next-line no-dupe-class-members
    async convertToCSV(data) {
        const csvRows = [];

        // En-têtes CSV
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));

        // Valeurs des données
        for (const row of data) {
            const values = headers.map((header) => {
                const escaped = ('' + row[header]).replace(/"/g, '\\"');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }

        return await csvRows.join('\n');
    }

;



    async sendEmail(user,attachement) {
        try {
            const transporter = await this.setTransporter();
            const data = this.convertToCSV(JSON.parse(attachement));
            const info = await transporter.sendMail({
                from: '"CSVExport" <film@film.film>', // sender address
                to: user.email, // list of receivers

                subject: 'CSV Export', // Subject line

                text: 'CSV Export', // plain text body

                html: '<b>CSV Export</b>', // html body

                attachments: [
                    {
                        filename: 'movies.csv',
                        content: attachement
                    }
                ]
            });
            console.log('Message sent: %s', info.messageId);
        } catch (err) {
            throw Boom.conflict(err.message);
        }
    }
};
