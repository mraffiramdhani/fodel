let createRecord = (knex, id, name, description) => {
  return knex('roles').insert({
    id,
    name,
    description
  })
}

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {

      let records = []
      let roles = ['administrator', 'restaurant', 'customer']
      // Inserts seed entries
      for (let i = 1; i <= roles.length; i++) {
        records.push(createRecord(knex, i, roles[i - 1], roles[i - 1]))
      }

      console.log('roles seed')
      return Promise.all(records)
    });
};
