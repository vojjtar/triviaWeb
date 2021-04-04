require('dotenv').config()
var mysql = require('mysql');

module.exports = {
    connectSQL: function(){
        const con = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.DATABAZE,
            password: process.env.HESLO,
            database: process.env.DATABAZE
        });
        return con;
    },
    sqlResultToString: function(input, jmenoSloupce){
        var output = JSON.stringify(input);
        output = JSON.parse(output);
        output = String(output[0][jmenoSloupce]);
        return output
    },
    sqlResultToJsonObject: function(input){
        var output = JSON.stringify(input);
        output = JSON.parse(output);
        return output
    }
}