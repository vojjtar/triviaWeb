require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');


const router = express.Router();


var sqlNastroje = require('../functions/sqlThings.js');


router.get('/', (req, res) => {
    res.render('login.ejs', { message: null });
})
  

  
router.post('/', async (req, res) => {

    var con = sqlNastroje.connectSQL();
    
    con.connect((err) => {
        if(err){
          console.log('Error connecting to Db');
          return;
        }
        console.log('Connection established');
    
        var jmeno = req.body.name;
        var hesloSubmitted = req.body.password;
        var hesloDatabaze;
  
  
        con.query(`SELECT * FROM databazeUzivatelu WHERE jmeno = '${jmeno}'`, function (err, result, fields) {
  
          if (result.length === 0){
            res.render('login.ejs', { message: `Jmeno '${jmeno}' neexistuje` })
          }
          if (result.length > 0){
            con.query(`SELECT heslo FROM databazeUzivatelu WHERE jmeno = '${jmeno}'`, function (err, result, fields){
              if (err) throw err;
  
              hesloDatabaze = sqlNastroje.sqlResultToString(result, 'heslo')
      
              //console.log(hesloDatabaze);
              //console.log(hesloSubmitted);
  
              bcrypt.compare(hesloSubmitted, hesloDatabaze, function(err, resultHash) {
                if (resultHash) {
  
                  con.query(`SELECT score FROM databazeUzivatelu WHERE jmeno = '${jmeno}'`, function (err, result, fields){
                    if (err) throw err;
  
                    console.log(result)
  
                    var scoreAmount = sqlNastroje.sqlResultToString(result, 'score');
  

                    req.session.score = scoreAmount
                    req.session.name = jmeno

                    res.redirect('/trivia');
  
                  });
                } else {
                  res.render('login.ejs', { message: 'spatne heslo' })
                }
                con.end();
              });
  
              //console.log(hesloDatabaze)
              
            });
          }
        });
    });
  
})



    
module.exports = router;