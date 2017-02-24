var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, () => console.log('Server started'));

var {getInfoById, likeById, dislikeById} = require('./db.js');

// app.get('/', (req, res) => res.send('Hello'));

app.get('/show/:id', async (req, res) => {
  var {id} = req.params;
  try{
    let result = await getInfoById(id);
    if(result.rows.length === 0) return res.redirect('/show/' + id);
    res.render('home', {girl: result.rows[0]});
  } catch (e) {
    res.send('Loi ' + err);
  }
});

app.get('/like/:id', (req, res) => {
  var {id} = req.params;
  likeById(id)
  .then(result => res.send(result.rows[0].like + ''))
  .catch(err => res.send(err + ''))
});

app.get('/dislike/:id', async (req, res) => {
  var {id} = req.params;
  let result = await dislikeById(id);
  res.send(result.rows[0].dislike + '');
  // dislikeById(id, (err, result) => res.send(result.rows[0].dislike + ''));

});

app.get('/getInfo/:id', (req, res) => {
  var {id} = req.params;
  getInfoById(id)
  .then(result => {
    if (id <= 0) {
      id = 1;
    }else {
      id = 5;
    }
    if(result.rows.length === 0) return res.redirect('/getInfo/' + id);
    res.send(result.rows[0]);
  })
  .catch(err => res.send('Loi ' + err));
});
