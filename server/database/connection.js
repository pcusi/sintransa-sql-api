const sql = require('mssql');
const config = require('./config');

const conn = new sql.ConnectionPool(config, (err, conn) => {
    if (err) throw err;
    conn ? console.log('Conexión a MSSQL exitosa!') : console.log('Ooops!');
}).connect();

module.exports = {
    sql,
    conn
};