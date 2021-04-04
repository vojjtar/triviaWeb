require('dotenv').config()
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

var sqlNastroje = require('../functions/sqlThings.js');

router.get('/', (req, res) => {
    res.render('register.ejs', { message: null });
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
        var heslo = req.body.password;
        var email = req.body.email;
  

        if (jmeno.length <= 30 && email.length <= 30 && heslo.length <= 300)
        {

          con.query(`SELECT * FROM databazeUzivatelu WHERE jmeno = '${jmeno}'`, function (err, result, fields) {
            if (err) throw err;
            console.log(result)
            if(result.length === 0){
              con.query(`SELECT * FROM databazeUzivatelu WHERE email = '${email}'`, function (err, result, fields){
                if (err) throw err;
    
                if(result.length === 0){
                  //let hash = bcrypt.hashSync(heslo, 10);
                  bcrypt.hash(heslo, 10, function(err, hash) {
                    con.query(`INSERT INTO databazeUzivatelu (jmeno, heslo, email, score) VALUES ('${jmeno}', '${hash}', '${email}', 0)`);
                    res.render('login.ejs', { message: 'You have been registered.' })
                  });
                }
                else{
                  res.render('register.ejs', { message: 'Email je zabrany' })
                }
    
              });
            }
            else if (result.length > 0){
              res.render('register.ejs', { message: 'Jmeno je zabrane' })
              console.log(result)
            }
    
          });
        }
        else if (jmeno.length > 30 || email.length > 30)
        {
          res.render('register.ejs', { message: 'Jmeno ani email nesmi presahovat 30 znaku' })
        }
        else if (heslo.length > 300)
        {
          res.render('register.ejs', { message: 'Heslo nesmi presahovat 300 znaku' })
        }
        //con.query("CREATE TABLE databazeUzivatelu (jmeno varchar(20), heslo varchar(20), email varchar(20))");
        //con.end();
    });
  
  
    //res.redirect('/login');
    //console.log(users);
  
  
})


module.exports = router;