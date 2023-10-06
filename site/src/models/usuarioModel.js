const database = require('../database/config')

function listarUsuariosPorEmpresa(idEmpresa) {
    return database.exec(`SELECT * FROM Usuario JOIN LanHouse ON Usuario.fkLanHouse = LanHouse.idLanHouse WHERE LanHouse.fkEmpresa = ${idEmpresa}`)
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
    listarUsuariosPorEmpresa,
    cadastrar,
    login
}