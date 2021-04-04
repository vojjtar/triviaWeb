//require('dotenv').config()
const express = require('express');
const app = express();
//const bcrypt = require('bcrypt');
//var mysql = require('mysql');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const { render } = require('ejs');

var titleNazvy = require('./functions/pageTitle.js')
//var sqlNastroje = require('./functions/sqlThings.js')


var registerRoute = require('./routes/register.js')
var loginRoute = require('./routes/login.js');
var triviaRoute = require('./routes/triviaLogic.js');
var scoreboardRoute = require('./routes/scoreBoard.js');
var aboutRoute = require('./routes/about.js')

const { json } = require('express');



app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));


app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/trivia', triviaRoute);
app.use('/scoreboard', scoreboardRoute);
app.use('/about', aboutRoute);



app.get('/', (req, res) => {
  res.render('index.ejs', { name: 'Trivia App' } );
})
app.post('/', (req, res) => {
  req.session.title = titleNazvy.documentTitleTrive('Guest')
  req.session.name = 'Guest'
  req.session.score = 'No score for guest'
  res.redirect('/trivia')
});


/*
app.get('/otazkaAPI', (req, res) => {
  res.send(req.query.otazka)
})
*/



module.exports = app;
