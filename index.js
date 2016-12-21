/**
 * Created by Dani on 20.12.2016.
 */

//Load logger
//const logger = require('./configs/winston');

//Database queries using promises
pQ = require('./models/promiseQueries');

pQ.connectToDatabase();

pQ.createDatabase();


for (let i=0;i<4;i++){
    pQ.createTable('table_'+i);
}







//Database queries using callback functions
cQ = require('./models/callbackQueries');