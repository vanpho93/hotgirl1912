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

function query(sql, cb){
  pool.connect((err, client, done) => {
    if(err) return cb(err);
    done();
    client.query(sql, cb);
  });
}

function getInfoById(id, cb){
  query('SELECT * FROM "HotGirl" WHERE id = ' + id, cb);
}

// getInfoById(3, (err, result) => console.log(result.rows));
module.exports = {getInfoById};
