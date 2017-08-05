var mysql     =    require('mysql');

var pool      =    mysql.createPool({
    connectionLimit : 40, //important
    host     : '127.0.0.1',
    user     : 'root',
    password : 'password01',
    database : 'partidos_ya',
    debug    :  false
});

var select_partido_by_id_sql = 	"select p.id_partido, c.tamanio, c.nombre_cancha, c.direccion, h.fecha, h.hora, j.id_jugador, j.nombre, j.handicup from partidos p "+
								"inner join canchas c on p.id_cancha = c.id_cancha "+
								"inner join horarios h on p.id_horario = h.id_horario "+
								"inner join partido_jugador pj on p.id_partido = pj.id_partido "+
								"inner join jugadores j on pj.id_jugador = j.id_jugador "+
								"where p.id_partido = ?";
var select_jugador_by_id_sql = 	"select j.id_jugador, j.nombre, j.apellido, j.handicup, pj.id_partido, h.fecha, h.hora, c.nombre_cancha, c.direccion, c.tamanio "+
								"from jugadores j "+
								"inner join partido_jugador pj on j.id_jugador = pj.id_jugador "+
								"inner join partidos p on p.id_partido = pj.id_partido "+
								"inner join horarios h on h.id_horario = p.id_horario "+
								"inner join canchas c on c.id_cancha = p.id_cancha "+
								"where j.id_jugador = ?"
var select_solo_jugador_by_id_sql = 	"select * from jugadores j where j.id_jugador = ?"
var select_cantidad_jugadores_by_id_partido_sql = 	"select pj.id_partido, count(*) cantidad from partido_jugador pj "+
												"where pj.id_partido = ? "+
												"group by pj.id_partido"
var select_jugadores_by_handicup_sql = "select * " +
										"from jugadores j " +
										"where j.handicup > 48 - 5 and j.handicup < 48 + 5 " +
										"and j.id_jugador not in (select pj.id_jugador from partido_jugador pj where pj.id_partido = 50)"

function execute_statement(statement,data,callback) {
	pool.getConnection(function(err,connection){
        if (err) {
		  console.log("Oh no! " + err);
          return;
        }   

        connection.query(statement,data,function(err,rows){
            connection.release();
            if(!err) {
				if(callback) callback(null,rows);
            } else {
				console.log("Demonios! No pude ejecutar " + statement + " con " +JSON.stringify(data)+" porque "  + err);
			}			
        });
		connection.setMaxListeners(1000);
        connection.once('error', function(err) {  
			  connection.release();
              console.log("Demonios 2! No pude ejecutar " + statement + " con " +JSON.stringify(data)+" porque "  + err);
              return;     
        });
  });
}

function select_partido_by_id(data, callback) {
	execute_statement(select_partido_by_id_sql, data, callback);
}

function select_jugador_by_id(data, callback) {
	execute_statement(select_jugador_by_id_sql, data, callback);
}

function select_cantidad_jugadores_by_id_partido(data, callback) {
	execute_statement(select_cantidad_jugadores_by_id_partido_sql, data, callback);
}

function select_jugadores_by_handicup(data, callback) {
	execute_statement(select_jugadores_by_handicup_sql, data, callback)
}

function select_solo_jugador_by_id(data, callback) {
	execute_statement(select_solo_jugador_by_id_sql, data, callback)
}

module.exports = {
	select_partido_by_id:select_partido_by_id,
	select_jugador_by_id:select_jugador_by_id,
	select_cantidad_jugadores_by_id_partido:select_cantidad_jugadores_by_id_partido,
	select_jugadores_by_handicup:select_jugadores_by_handicup,
	select_solo_jugador_by_id:select_solo_jugador_by_id
};