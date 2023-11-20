const database = require('../database/config')

function cadastrar(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) {
    try {
        database.exec(`INSERT INTO Empresa (cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) VALUES ('${cnpj}', '${nomeFantasia}', '${razaoSocial}', ${fkRepresentante}, ${fkEndereco})`)
        return database.exec(`SELECT IDENT_CURRENT('Empresa') as insertId`)
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
    buscarEmpresaPorId
}