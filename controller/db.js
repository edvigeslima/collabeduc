var mysql = require('mysql');
module.exports = {
   init : function() {
       console.error("Initing database");
       var conn = mysql.createConnection({
           host     : 'localhost',
           user     : 'root',
           password : '',
           database : 'collabeduc'
       });
       conn.connect();
       return conn;
   },
};
