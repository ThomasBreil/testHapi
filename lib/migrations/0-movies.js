'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('movies', (table) => {

            table.increments('id').primary();
            table.string('Name').notNull();
            table.string('Director').notNull();
            table.string('Genre').notNull();
            table.date('ReleaseDate').notNull();

            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
