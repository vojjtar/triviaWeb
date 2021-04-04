const express = require('express');

const router = express.Router();


var sqlNastroje = require('../functions/sqlThings.js');


router.get('/', (req, res) => {

    var con = sqlNastroje.connectSQL();
  
    con.connect((err) => {
      if(err){
        console.log('Error connecting to Db');
        return;
      }
  
      con.query(`SELECT score, jmeno FROM databazeUzivatelu ORDER BY score DESC LIMIT 50`, function(err, result, fields){
        var jsonResult = sqlNastroje.sqlResultToJsonObject(result)
  
        console.log(jsonResult)

  
        res.render('scoreBoard.ejs', { hraci: jsonResult})
      })

    })
})



module.exports = router;