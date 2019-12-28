
exports.up = function (knex) {
    return knex.schema.createTable('restaurants', table => {
        table.increments('id')
        table.string('name')
        table.string('logo')
        table.string('longitude')
        table.string('latitude')
        table.text('description')
        table.integer('user_id').unsigned()
        table.timestamps()

        table.foreign('user_id').references('users.id')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('restaurants')
};
