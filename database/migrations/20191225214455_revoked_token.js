
exports.up = function (knex) {
    return knex.schema.createTable('revoked_token', table => {
        table.bigIncrements('id')
        table.string('token')
        table.integer('is_revoked', 1)
        table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('revoked_token')
};
