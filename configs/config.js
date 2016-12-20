/**
 * Created by Dani on 20.12.2016.
 */

module.exports = {
    rethinkdb: {
        host: 'localhost',
        port: 28015,
        db: 'rethinkdb_queries',
        user: 'admin',
        password: '',
        timeout: 20,
        ssl: null
    }
};

/*
host: the host to connect to (default localhost)
port: the port to connect on (default 28015)
db: the default database (default test)
user: the user account to connect as (default admin)
password: the password for the user account to connect as (default '', empty)
timeout: timeout period in seconds for the connection to be opened (default 20)
ssl: a hash of options to support SSL connections (default null). Currently, there
    is only one option available, and if the ssl option is specified, this key is required:
    ca: a list of Node.js Buffer objects containing SSL CA certificates

*/