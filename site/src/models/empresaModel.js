const database = require('../database/config')

function cadastrar(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) {
    try {
        return database.exec(
            `INSERT INTO Empresa VALUES (null, '${cnpj}', '${nomeFantasia}', '${razaoSocial}', default, ${fkRepresentante}, ${fkEndereco})`)
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco);
}

function cadastrar_sqlserver(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) {
    try {
        return database.exec(`INSERT INTO Empresa VALUES (DEFAULT, '${cnpj}', '${nomeFantasia}', '${razaoSocial}', DEFAULT, ${fkRepresentante}, ${fkEndereco})`)
    } catch (e) {
        console.log(e)
    }
}

function buscarEmpresaPorId(idEmpresa) {
    try {
        return database.exec(`SELECT * FROM Empresa WHERE idEmpresa = ${idEmpresa}`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarEmpresaPorId,
    cadastrar_sqlserver
}