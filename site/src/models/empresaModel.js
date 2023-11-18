const database = require('../database/config')

function cadastrar(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) {
    try {
        return database.exec(
            `INSERT INTO Empresa VALUES (null, '${cnpj}', '${nomeFantasia}', '${razaoSocial}', default, ${fkRepresentante}, ${fkEndereco})`, `mysql`
        )
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco);
}
function cadastrar_sqlserver(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) {
    try {
        return database.exec(
            `INSERT INTO Empresa VALUES (DEFAULT, '${cnpj}', '${nomeFantasia}', '${razaoSocial}', DEFAULT, ${fkRepresentante}, ${fkEndereco})`, `mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarEmpresaPorId(idEmpresa) {
    // try {
    //     return database.exec(
    //         `SELECT * FROM Empresa WHERE idEmpresa = ${idEmpresa}`,`mysql`
    //     )
    // } catch (e) {
    //     console.log(e)
    // }
    buscarEmpresaPorId_sqlserver(idEmpresa);
}
function buscarEmpresaPorId_sqlserver(idEmpresa) {
    try {
        return database.exec(
            `SELECT * FROM Empresa WHERE idEmpresa = ${idEmpresa}`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarEmpresaPorId,

    cadastrar_sqlserver,
    buscarEmpresaPorId_sqlserver,
}