
exports.up = function (knex) {
    return knex.schema.createTable('reviews', table => {
        table.increments('id')
        table.integer('rating', 1)
        table.text('review')
        table.integer('item_id')
        table.integer('user_id')
        table.timestamps()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('reviews')
};
