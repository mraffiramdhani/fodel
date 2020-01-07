
exports.up = function (knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id')
        table.string('name')
        table.decimal('price', 12, 2)
        table.text('description')
        table.integer('restaurant_id').unsigned()
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

        table.foreign('restaurant_id').references('restaurants.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('items')
};
