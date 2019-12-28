
exports.seed = function (knex) {
  // Deletes ALL existing entries
  console.log('categories seed')
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, name: 'makanan' },
        { id: 2, name: 'minuman' },
        { id: 3, name: 'pedas' },
        { id: 4, name: 'manis' },
        { id: 5, name: 'kue' },
        { id: 6, name: 'aneka nasi' },
        { id: 7, name: 'bakso & soto' },
        { id: 8, name: 'cepat saji' },
        { id: 9, name: 'bakmie' },
        { id: 10, name: 'boba' }
      ]);
    });
};
