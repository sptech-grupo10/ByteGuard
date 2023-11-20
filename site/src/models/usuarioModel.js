const database = require('../database/config')

function listarUsuariosPorEmpresa(idEmpresa) {
    return database.exec(`SELECT * FROM Usuario JOIN LanHouse ON Usuario.fkLanHouse = LanHouse.idLanHouse WHERE LanHouse.fkEmpresa = ${idEmpresa}`)
}

function cadastrar(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario) {
    try {
        database.exec(`INSERT INTO Usuario (nome, email, senha, fkEmpresa, fkLanhouse, fkTipoUsuario) VALUES ('${nome}', '${email}', '${senha}', ${fkEmpresa}, ${fkLanHouse}, ${tipoUsuario})`)
        return database.exec(`SELECT IDENT_CURRENT('Usuario') as insertId`)
    } catch (e) {
        console.log(e)
    }
}

function login(email, senha) {
    try {
        return database.exec(`SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}'`)
    } catch (e) {
        console.log(e)
    }
}

function ativarUsuario(idUsuario) {
    try {
        return database.exec(`UPDATE Usuario SET statusUsuario = 1 WHERE idUsuario = ${idUsuario}`)
    } catch (e) {
        console.log(e)
    }
}

function desativarUsuario(idUsuario) {
    try {
        return database.exec(`UPDATE Usuario SET statusUsuario = 0 WHERE idUsuario = ${idUsuario}`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    listarUsuariosPorEmpresa,
    cadastrar,
    login,
    ativarUsuario,
    desativarUsuario
}