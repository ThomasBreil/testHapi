'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');
const MailService = require('./mailer');
const Encrypt = require('../modules/iut-encrypt');


const amqp = require('amqplib/callback_api');
const nodemailer = require('nodemailer');
const fs = require('fs');
const csv = require('csv-parser');


// Configuration RabbitMQ
const RABBITMQ_URL = 'amqp://localhost';
const RABBITMQ_QUEUE = 'csv_export';



module.exports = class MessageBrokerService extends Service {




    // eslint-disable-next-line require-await
    async sendToQueue(data) {
        amqp.connect(RABBITMQ_URL, (error0, connection) => {
            if (error0) {
                throw error0;
            }

            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }

                const queue = 'hello';

                channel.assertQueue(RABBITMQ_QUEUE, {
                    durable: false
                });

                channel.sendToQueue(RABBITMQ_QUEUE, Buffer.from(JSON.stringify(data)));
                console.log(' data sent to queue');
            });
        });
    }

    // eslint-disable-next-line require-await
    async consumeQueue(user) {
        amqp.connect('amqp://localhost', (error0, connection) => {
            if (error0) {
                throw error0;
            }

            connection.createChannel((error1, channel) => {
                if (error1) {
                    throw error1;
                }

                const queue = 'hello';

                channel.assertQueue(RABBITMQ_QUEUE, {
                    durable: false
                });
                channel.consume(RABBITMQ_QUEUE, (data) => {
                    const mailService = new MailService();

                    mailService.sendEmail(user,data.content.toString());
                }, {
                    noAck: true
                });
            });


        });
    }


};

