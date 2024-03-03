'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('favorites', (table) => {

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
