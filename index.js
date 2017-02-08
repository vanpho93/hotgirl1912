var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'));

var {getInfoById, likeById, dislikeById} = require('./db.js');

app.get('/', (req, res) => res.render('home'));

app.get('/show/:id', (req, res) => {
  var {id} = req.params;
  getInfoById(id, (err, result) => {
    if(err) return res.send('Loi ' + err);
    if (id <= 0) {
      id = 1;
    }else {
      id = 5;
    }
    if(result.rows.length === 0) return res.redirect('/show/' + id);
    res.render('home', {girl: result.rows[0]});
  });
});

app.get('/like/:id', (req, res) => {
  var {id} = req.params;
  likeById(id, (err, result) => res.send(result.rows[0].like + ''));
});
app.get('/dislike/:id', (req, res) => {
  var {id} = req.params;
  dislikeById(id, (err, result) => res.send(result.rows[0].dislike + ''));
});
