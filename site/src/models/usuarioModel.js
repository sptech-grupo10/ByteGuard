const database = require('../database/config')

function retornarUsuarios() {
    database.exec('SELECT * FROM Usuario').then(usuarios => {
        console.log(usuarios)
    })
}

function cadastrar(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario) {
    try {
        return database.exec(
            `INSERT INTO Usuario VALUES (null, '${nome}', '${email}', '${senha}', default, ${fkEmpresa}, ${fkLanHouse}, ${tipoUsuario})`
        )
    } catch (e) {
        console.log(e)
    }
}

function login(email, senha) {
    try {
        return database.exec(`SELECT * FROM Usuario WHERE email = "${email}" AND senha = "${senha}"`)
    }catch(e) {
        console.log(e)
    }
}

module.exports = {
    retornarUsuarios,
    cadastrar,
    login
}