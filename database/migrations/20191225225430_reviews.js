
exports.up = function (knex) {
    return knex.schema.createTable('reviews', table => {
        table.increments('id')
        table.integer('rating', 1)
        table.text('review')
        table.integer('item_id').unsigned()
        table.integer('user_id').unsigned()
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

        table.foreign('item_id').references('items.id').onDelete('cascade').onUpdate('cascade')
        table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('reviews')
};
