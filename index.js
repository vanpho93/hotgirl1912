var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));
app.listen(3000, () => console.log('Server started'));

var {getInfoById} = require('./db.js');

app.get('/', (req, res) => res.render('home'));

app.get('/show/:id', (req, res) => {
  getInfoById(req.params.id, (err, result) => {
    if(err) return res.send('Loi ' + err);
    if(result.rows.length === 0) return res.send('Khong ton tai');
    res.render('home', {girl: result.rows[0]});
  });
});
