/**
 * Created by Dani on 20.12.2016.
 */

r = require('rethinkdb');

config = require('../configs/config');


module.exports = {
    connectionUsingPromises,
    connectionUsingCallbackFunction,
    createDatabase,
    createDatabase2,
    createTable
};


function connectionUsingPromises() {
    r.connect(config.rethinkdb).then(function (conn) {
        console.log('Connection using promises successful');
    }).error(function (err) {
        throw err;
    });
}

function connectionUsingCallbackFunction() {
    r.connect(config.rethinkdb, function (err, conn) {
        if(err){
            throw err;
        }else{
            console.log('Connection using callback functions successful');
        }
    });
}


function createDatabase() {
    r.connect(config.rethinkdb).then(function (conn) {
        r.dbCreate(config.rethinkdb.db).run(conn).then(function (result) {
            console.log(result);
        }).error(function (err) {
            console.log('createDatabase: Database already existing');
        })
    }).error(function (err) {
        console.log('createDatabase: Connection to RethinkDB failed');
    });
}


function createDatabase2() {
    r.connect(config.rethinkdb, function (err, conn) {
        if(err){
            console.log('createDatabase: Connection to RethinkDB failed');
        }else{
            r.dbCreate(config.rethinkdb.db).run(conn, function (err, result) {
                if(err){
                    console.log('createDatabase: Table already existing');
                }else{
                    console.log(result);
                }
            })
        }
    });
}








function createTable(table_name) {
    r.connect(config.rethinkdb).then(function (conn) {
        r.tableCreate(table_name).run(conn).then(function (result) {
            console.log(result);
        })
    }).error(function (err) {
        throw err;
    });
}
