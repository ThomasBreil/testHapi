'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.createTable('favorites', (table) => {
            table.integer('user_id').unsigned();
            table.integer('movie_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.foreign('movie_id').references('movies.id');
            table.primary(['user_id', 'movie_id']);
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
