
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name')
        table.string('username')
        table.string('password')
        table.integer('role_id').unsigned()
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

        table.unique('username')
        table.foreign('role_id').references('roles.id').onDelete('cascade').onUpdate('cascade')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};
