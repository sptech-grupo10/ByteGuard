const mysql = require('mysql2');
const sql = require('mssql');

function exec(query) {
    if (process.env.AMBIENTE === 'desenvolvimento' && query.includes('LIMIT 1')) {
        query.replace(/LIMIT 1/, '').replace(/SELECT/, 'SELECT TOP 1')
    }

    const conexao = process.env.AMBIENTE === 'desenvolvimento'
        ? mysql.createConnection({
            host: 'localhost',
            database: 'ByteGuard',
            user: 'root',
            password: 'kauan123'
        })
        : new sql.ConnectionPool({
            server: '54.159.238.176',
            database: 'ByteGuard',
            user: 'sa',
            password: 'sqlwindols',
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true, // for azure
            }
        })

    return new Promise((resolve, reject) => {
        conexao.connect((err) => {
            if (err) {
                reject(err);
                return;
            }

            conexao.query(query, (err, resultados) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultados);
                }

                conexao.end(); // Fecha a conexão após a execução da consulta
            })
        })
    })
}

module.exports = { exec };
