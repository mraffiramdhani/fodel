const faker = require('faker')

var range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

let createRecord = (knex, id, user_id) => {
  return knex('restaurants').insert({
    id,
    name: faker.company.companyName(),
    logo: faker.image.business(),
    longitude: faker.address.longitude(),
    latitude: faker.address.latitude(),
    description: faker.lorem.paragraphs(3),
    user_id,
    created_at: new Date(),
    updated_at: new Date()
  })
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('restaurants').del()
    .then(function () {
      // Inserts seed entries
      let records = []
      let rest_user = range(2, 5)
      // Inserts seed entries
      for (let i = 0; i < rest_user.length; i++) {
        records.push(createRecord(knex, i + 1, rest_user[i]))
      }

      console.log('restaurant seed')
      return Promise.all(records)
    });
};
