/**
 * Created by Rötzer on 21.12.2016.
 */

//Load logger
const logger = require('../configs/winston');

//Load database
const r = require('rethinkdb');

//Load configs
const config = require('../configs/config');

//Export our defined database query functions
module.exports = {
    connectToDatabase,
    createDatabase,
    createTable
};

logger.log('silly','silly');
logger.log('verbose','verbose');
logger.log('info','info');
logger.log('warn','warn');
logger.log('error','err');



//Establish a connection to the Database
function connectToDatabase() {
    r.connect(config.promiseDb).then(function (conn) {
        logger.log('info','Promises - connectToDatabase: Connection successful');
    }).error(function (err) {
        logger.log('error','Promises - connectToDatabase: Connection to RethinkDB failed\n'+err);
    });
}

//Create Database
function createDatabase() {
    r.connect(config.promiseDb).then(function (conn) {
        r.dbCreate(config.promiseDb.db).run(conn).then(function (result) {
            logger.log('info','Promises - createDatabase: Successfully created database ->' + config.promiseDb.db + '\n' + JSON.stringify(result,null, 2));
        }).error(function (err) {
            if(err.name=='ReqlOpFailedError'){
                logger.log('info','Promises - createDatabase: Database already existing');
            }else{
                logger.log('error','Promises - createDatabase: Database could not be created\n'+err);
            }
        })
    }).error(function (err) {
        logger.log('error','Promises - createDatabase: Connection to RethinkDB failed\n'+err);
    });
}


//Create Table
function createTable(table_name) {
    r.connect(config.promiseDb).then(function (conn) {
        r.tableCreate(table_name).run(conn).then(function (result) {
            logger.log('info', 'Promises - createTable: Successfully created table ->' + table_name + '\n' + JSON.stringify(result,null,0));
        }).error(function (err) {
            if(err.name=='ReqlOpFailedError'){
                logger.log('info','Promises - createTable: Table already existing');
            }else{
                logger.log('error','Promises - createTable: Table could not be created\n'+err);
            }
        })
    }).error(function (err) {
        logger.log('error','Promises - createTable: Connection to RethinkDB failed\n'+err);
    });
}
