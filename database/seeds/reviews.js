const faker = require('faker')

var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

let createRecord = (knex, item_id, user_id) => {
  return knex('reviews').insert({
    rating: getRandomInt(1, 5),
    review: faker.lorem.sentence(5),
    item_id,
    user_id,
    created_at: new Date(),
    updated_at: new Date()
  })
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      let records = []
      let user = range(6, 10)
      // Inserts seed entries
      for (let i = 0; i <= user.length; i++) {
        for (let j = 1; j <= 50; j++) {
          records.push(createRecord(knex, j, user[i]))
          // let id = j
          // if (i > 0) id = `${((j == 10) ? i + 1 + `0` : i)}` + `${((j == 10) ? `` : j)}`
          // records.push(createItem(knex, id, rest_user[i]))
          // let ran_count = getRandomInt(1, 10)
          // for (let k = 0; k < ran_count; k++) {
          // records.push(createRel(knex, id, k + 1))
          // }

        }
      }
      return Promise.all(records)
    });
};
