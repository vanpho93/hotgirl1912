var pg = require('pg');

var config = {
  user: 'postgres',
  database: 'Node1912',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 1000
};

var pool = new pg.Pool(config);

// function query(sql, cb){
//   pool.connect((err, client, done) => {
//     if(err) return cb(err);
//     done();
//     client.query(sql, cb);
//   });
// }

let query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, done) => {
      if(err) return reject(err);
      done();
      client.query(sql, (err, result) => {
        if(err) return reject(err);
        resolve(result);
      });
    });
  })
}

function getInfoById(id){
  return query('SELECT * FROM "HotGirl" WHERE id = ' + id);
}

function likeById(id) {
  var sql = `UPDATE public."HotGirl" SET "like"= "like" + 1
  WHERE id = ${id} RETURNING "like"`;
  return query(sql);
}
function dislikeById(id) {
  var sql = `UPDATE public."HotGirl" SET "dislike"= "dislike" + 1
  WHERE id = ${id} RETURNING "dislike"`;
  return query(sql);
}

// getInfoById(3, (err, result) => console.log(result.rows));
// likeById(1, (err, result) => console.log(result.rows));

module.exports = {getInfoById, likeById, dislikeById};
