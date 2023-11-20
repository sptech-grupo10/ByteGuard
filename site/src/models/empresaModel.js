const database = require('../database/config')

function cadastrar(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) {
    try {
        return database.exec(`INSERT INTO Empresa (cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco) VALUES ('${cnpj}', '${nomeFantasia}', '${razaoSocial}', ${fkRepresentante}, ${fkEndereco})`)
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