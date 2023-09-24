const database = require('../database/config')

function retornarUsuarios() {
    database.exec('SELECT * FROM Usuario').then(usuarios => {
        console.log(usuarios)
    })
}

function cadastrar(nome, email, senha) {
    try {
        return database.exec(
            `INSERT INTO Usuario VALUES(null, '${nome}', '${email}', '${senha}', 1)`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    retornarUsuarios,
    cadastrar
}