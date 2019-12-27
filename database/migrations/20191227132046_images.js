
exports.up = function (knex) {
    return knex.schema.createTable('item_images', table => {
        table.increments('id')
        table.integer('item_id')
        table.string('filename')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('item_images')
};
