// var pg = require('pg');
// var connectionString = "postgres://postgres:postgres@localhost:5432/Bigfoot_sightings";
// //postgres://postgres:postgres@localhost:5432/Bigfoot_sightings
// var pgClient = new pg.Client(connectionString);
// pgClient.connect();


// var query = pgClient.query("SELECT * from sightings_by_year ");

// query.on("row", function(row,result){

//     result.addRow(row);
    
//     });
  
    const pg = require('pg');
    const R = require('ramda');
    const cs = 'postgres://postgres:postgres@localhost:5432/Bigfoot_sightings';
    
    const client = new pg.Client(cs);
    client.connect();
    
    client.query('SELECT * from sightings_by_year').then(res => {
    
        const result = R.head(R.values(R.head(res.rows)));
    
        console.log(result);
    }).finally(() => client.end());