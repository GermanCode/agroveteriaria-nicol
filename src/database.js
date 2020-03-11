const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.erro('DATABASE CNNECTION WAS CLOSED');
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS MANY CONNECTIONS');
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE WAS CONNECTION REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
});

pool.query = promisify(pool.query)

module.exports = pool;