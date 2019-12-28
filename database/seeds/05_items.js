const faker = require('faker')

var range = (start, end) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let createItem = (knex, id, restaurant_id) => {
  return knex('items').insert({
    id,
    name: faker.lorem.sentence(2, 5),
    price: faker.random.number(2000000),
    description: faker.lorem.paragraphs(3),
    restaurant_id,
    created_at: new Date(),
    updated_at: new Date()
  })
}

let truncateRel = (knex) => {
  return knex('item_category').del()
}

let createRel = (knex, item_id, category_id) => {
  return knex('item_category').insert({
    item_id,
    category_id
  })
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      let records = []
      records.push(truncateRel(knex))
      let rest_user = range(1, 4)
      // Inserts seed entries
      for (let i = 0; i < rest_user.length; i++) {
        for (let j = 1; j <= 10; j++) {
          let id = j
          if (i > 0) id = `${((j == 10) ? i + 1 + `0` : i)}` + `${((j == 10) ? `` : j)}`
          records.push(createItem(knex, id, rest_user[i]))
        }
      }

      console.log('items seed')
      return Promise.all(records)
    });
};
