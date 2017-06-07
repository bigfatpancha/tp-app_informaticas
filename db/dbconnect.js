var mysql     =    require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 40, //important
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password01',
    database : 'partidos_ya',
    debug    :  false
});