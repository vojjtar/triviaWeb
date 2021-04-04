const express = require('express');
const router = express.Router();


var sqlNastroje = require('../functions/sqlThings.js');
var titleNazvy = require('../functions/pageTitle.js')


router.get('/', (req, res) => {

    console.log(req.session.name)

    if (req.session.name == undefined){
      req.session.title = 'Guest'
      req.session.name = 'Guest'
      req.session.score = 'No score for guest'
    }
  
    res.render('trivia.ejs', { title: titleNazvy.documentTitleTrive(req.session.name),
                               name: req.session.name,
                               score: req.session.score });
})
  
router.post('/', (req, res) => {
  
    var jmeno = req.body.jmeno
    var score = req.body.score
  
    var con = sqlNastroje.connectSQL();
  
    con.connect((err) => {
      if(err){
        console.log('Error connecting to Db');
        return;
      }
      console.log('Connection established');
  
      console.log(`'${jmeno}'`)
  
      try{
        con.query(`UPDATE databazeUzivatelu SET score = score + ${score} WHERE jmeno = '${jmeno}'`, function (err, result) {
          if (err) throw err;
          console.log(result)
        })
      }
      catch{
        console.log('uzivatel nebyl nalezen')
      }
  
      con.commit()
      con.end()
    })
  
})

module.exports = router;