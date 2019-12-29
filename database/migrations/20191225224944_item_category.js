
exports.up = function (knex) {
    return knex.schema.createTable('item_category', table => {
        table.integer('item_id').unsigned()
        table.integer('category_id').unsigned()

        table.foreign('item_id').references('items.id').onDelete('cascade').onUpdate('cascade')
        table.foreign('category_id').references('categories.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_category')
};
