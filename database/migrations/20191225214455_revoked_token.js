
exports.up = function (knex) {
    return knex.schema.createTable('revoked_token', table => {
        table.bigIncrements('id')
        table.string('token')
        table.integer('is_revoked', 1)
        table.timestamps()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('revoked_token')
};
