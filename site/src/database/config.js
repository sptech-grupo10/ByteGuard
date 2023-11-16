const mysql = require('mysql2');
const sql = require('mssql');

function exec(query, tipoBanco) {
    const conexao = tipoBanco === 'mysql'
        ? mysql.createConnection({
            host: 'localhost',
            database: 'ByteGuard',
            user: 'aluno',
            password: 'aluno'
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
        });

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
            });
        });
    });
}

module.exports = { exec };
