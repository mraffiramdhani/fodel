
exports.up = function (knex) {
    return knex.schema.createTable('carts', table => {
        table.increments('id')
        table.integer('item_id').unsigned()
        table.integer('quantity')
        table.text('description')
        table.integer('user_id').unsigned()
        table.timestamps()

        table.foreign('item_id').references('items.id')
        table.foreign('user_id').references('users.id')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('carts')
};
