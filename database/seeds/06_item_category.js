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

let createRel = (knex, item_id, category_id) => {
  return knex('item_category').insert({
    item_id,
    category_id
  })
}

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('item_category').del()
    .then(function () {
      let records = []
      let rest_user = range(1, 4)
      // Inserts seed entries
      for (let i = 0; i < rest_user.length; i++) {
        for (let j = 1; j <= 10; j++) {
          let id = j
          if (i > 0) id = `${((j == 10) ? i + 1 + `0` : i)}` + `${((j == 10) ? `` : j)}`
          let ran_count = getRandomInt(1, 10)
          for (let k = 0; k < ran_count; k++) {
            records.push(createRel(knex, id, k + 1))
          }
        }
      }

      console.log('item_category seed')
      return Promise.all(records)
    });
};
