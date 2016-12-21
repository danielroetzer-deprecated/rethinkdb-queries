/**
 * Created by Rötzer on 21.12.2016.
 */


//Load logger
const logger = require('../configs/winston');

//Load database
const r = require('rethinkdb');

//Load config
config = require('../configs/config');

//Export our defined database queries
module.exports = {
    connectToDatabase,
    createDatabase
};



function connectToDatabase() {
    r.connect(config.callbackDb, function (err, conn) {
        if(err){
            logger.log('error','Callbacks - connectToDatabase: Connection to RethinkDB failed\n'+err);
        }else{
            logger.log('silly','Callbacks - connectToDatabase: Connection successful');

        }
    });
}



function createDatabase() {
    r.connect(config.callbackDb, function (err, conn) {
        if(err){
            logger.log('error','Callbacks - createDatabase: Connection to RethinkDB failed\n'+err);
        }else{
            r.dbCreate(config.callbackDb.db).run(conn, function (err, result) {
                if(err.name=='ReqlOpFailedError'){
                    logger.log('silly','Callbacks - createDatabase: Database already existing');
                }else if(err){
                    logger.log('error','Callbacks - createDatabase: Database could not be created\n'+err);
                }else{
                    logger.log('info','Promises - createDatabase: Successfully created database ->' + config.callbackDb.db + '\n' + JSON.stringify(result,null, 2));
                }
            })
        }
    });
}



//Create Table
function createTable(table_name) {
    r.connect(config.callbackDb, function (err, conn) {
        if(err){
            logger.log('error','Callbacks - createTable: Connection to RethinkDB failed\n'+err);
        }else{
            r.tableCreate(table_name).run(conn, function (err, result) {
                if(err.name=='ReqlOpFailedError'){
                    logger.log('info','Callbacks - createTable: Table already existing');
                }else if(err){
                    logger.log('error','Callbacks - createTable: Table could not be created\n'+err);
                }else{
                    logger.log('info', 'Promises - createTable: Successfully created table ->' + table_name + '\n' + JSON.stringify(result,null,0));
                }
            })
        }
    });
}
