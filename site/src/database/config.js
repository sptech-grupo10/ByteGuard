const mysql = require('mysql2')
const sql = require('mssql')

function exec(query) {
    return new Promise((res, rej) => {
        const conexao = mysql.createConnection({
            host: 'localhost',
            database: 'ByteGuard',
            user: 'root',
            password: 'kauan123'
        })
        conexao.connect();

        conexao.query(query, (e, resultados) => {
            conexao.end()
            e
                ? rej(e)
                : res(resultados)
        })
    })
}

module.exports = { exec }