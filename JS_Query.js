var pg = require(‘pg’);
var connectionString = "postgres://postgres:postgres@localhost/ip:5432/Bigfoot_sightings";
//host="localhost", port = 5432, database="Bigfoot_sightings", user="postgres", password="postgres"

var pgClient = new pg.Client(connectionString);
pgClient.connect();

var query = pgClient.query("SELECT * from bfro_data ");

query.on("row", function(row,result){

    result.addRow(row);
    
    });
