
exports.up = function (knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id')
        table.string('name')
        table.decimal('price', 12, 2)
        table.text('description')
        table.integer('restaurant_id').unsigned()
        table.timestamps()

        table.foreign('restaurant_id').references('restaurants.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('items')
};
