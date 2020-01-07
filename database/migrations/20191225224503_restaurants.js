
exports.up = function (knex) {
    return knex.schema.createTable('restaurants', table => {
        table.increments('id')
        table.string('name')
        table.string('logo')
        table.string('longitude')
        table.string('latitude')
        table.text('description')
        table.integer('user_id').unsigned()
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

        table.foreign('user_id').references('users.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('restaurants')
};
