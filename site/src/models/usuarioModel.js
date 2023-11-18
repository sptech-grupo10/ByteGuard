const database = require('../database/config')

function listarUsuariosPorEmpresa(idEmpresa) {
    //return database.exec(`SELECT * FROM Usuario JOIN LanHouse ON Usuario.fkLanHouse = LanHouse.idLanHouse WHERE LanHouse.fkEmpresa = ${idEmpresa}`,`mysql`)
    listarUsuariosPorEmpresa_sqlserver(idEmpresa);
}
function listarUsuariosPorEmpresa_sqlserver(idEmpresa) {
    return database.exec(`SELECT * FROM Usuario JOIN LanHouse ON Usuario.fkLanHouse = LanHouse.idLanHouse WHERE LanHouse.fkEmpresa = ${idEmpresa}`,`mssql`)
}

function cadastrar(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario) {
    try {
        return database.exec(
            `INSERT INTO Usuario VALUES (null, '${nome}', '${email}', '${senha}', default, ${fkEmpresa}, ${fkLanHouse}, ${tipoUsuario})`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario);
}
function cadastrar_sqlserver(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario) {
    try {
        return database.exec(
            `INSERT INTO Usuario VALUES (DEFAULT, '${nome}', '${email}', '${senha}', DEFAULT, ${fkEmpresa}, ${fkLanHouse}, ${tipoUsuario})`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function login(email, senha) {
    try {
        return database.exec(`SELECT * FROM Usuario WHERE email = "${email}" AND senha = "${senha}"`,`mysql`)
    } catch (e) {
        console.log(e)
    }
    login_sqlserver(email, senha);
}
function login_sqlserver(email, senha) {
    try {
        return database.exec(`SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}'`,`mssql`)
    } catch (e) {
        console.log(e)
    }
}

function ativarUsuario(idUsuario) {
    try {
        return database.exec(`UPDATE Usuario SET statusUsuario = 1 WHERE idUsuario = ${idUsuario}`,`mysql`)
    } catch (e) {
        console.log(e)
    }
    ativarUsuario_sqlserver(idUsuario);
}
function ativarUsuario_sqlserver(idUsuario) {
    try {
        return database.exec(`UPDATE Usuario SET statusUsuario = 1 WHERE idUsuario = ${idUsuario}`,`mssql`)
    } catch (e) {
        console.log(e)
    }
}

function desativarUsuario(idUsuario) {
    try {
        return database.exec(`UPDATE Usuario SET statusUsuario = 0 WHERE idUsuario = ${idUsuario}`,`mysql`)
    } catch (e) {
        console.log(e)
    }
}
function desativarUsuario_sqlserver(idUsuario) {
    try {
        return database.exec(`UPDATE Usuario SET statusUsuario = 1 WHERE idUsuario = ${idUsuario}`,`mssql`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    listarUsuariosPorEmpresa,
    cadastrar,
    login,
    ativarUsuario,
    desativarUsuario,
    
    listarUsuariosPorEmpresa_sqlserver,
    cadastrar_sqlserver,
    login_sqlserver,
    ativarUsuario_sqlserver,
    desativarUsuario_sqlserver
}