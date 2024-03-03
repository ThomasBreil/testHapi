'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {

            table.string('email').notNull();
            table.string('password').notNull();
            table.string('username').notNull();
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
