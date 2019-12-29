
exports.up = function (knex) {
    return knex.schema.createTable('item_images', table => {
        table.increments('id')
        table.integer('item_id').unsigned()
        table.string('filename')

        table.foreign('item_id').references('items.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_images')
};
