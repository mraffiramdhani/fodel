
exports.up = function (knex) {
    return knex.schema.createTable('item_category', table => {
        table.integer('item_id')
        table.integer('category_id')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_category')
};
