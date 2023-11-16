const database = require('../database/config')

function cadastrar(cep, logradouro, numero, bairro, cidade, uf) {
    try {
        return database.exec(
            `INSERT INTO Endereco VALUES (null, '${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}')`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarEnderecoPorId(idEndereco) {
    try {
        return database.exec(
            `SELECT * FROM Endereco WHERE idEndereco = ${idEndereco}`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarEnderecoPorId
}