
exports.up = function (knex) {
    return knex.schema.createTable('revoked_token', table => {
        table.bigIncrements('id')
        table.string('token')
        table.tinyInteger('is_revoked')
        table.timestamps()
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('revoked_token')
};
