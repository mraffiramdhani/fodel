
exports.up = function (knex) {
    return knex.schema.createTable('carts', table => {
        table.increments('id')
        table.integer('item_id').unsigned()
        table.integer('quantity')
        table.text('description')
        table.integer('user_id').unsigned()
        table.integer('is_complete').defaultTo(0)
        table.timestamps()

        table.foreign('item_id').references('items.id').onDelete('cascade').onUpdate('cascade')
        table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('carts')
};
