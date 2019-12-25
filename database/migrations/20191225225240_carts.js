
exports.up = function (knex) {
    return knex.schema.createTable('carts', table => {
        table.increments('id')
        table.integer('item_id')
        table.integer('quantity')
        table.text('description')
        table.integer('user_id')
        table.timestamps()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('carts')
};
