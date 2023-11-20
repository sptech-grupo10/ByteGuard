const database = require('../database/config')

function cadastrar(cep, logradouro, numero, bairro, cidade, uf) {
    try {
        return database.exec(`INSERT INTO Endereco (cep, logradouro, numero, bairro, cidade, uf) VALUES ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}')`)
    } catch (e) {
        console.log(e)
    }
}

function buscarEnderecoPorId(idEndereco) {
    try {
        return database.exec(`SELECT * FROM Endereco WHERE idEndereco = ${idEndereco}`)
    } catch (e) {
        console.log(e)
    }
    buscarEnderecoPorId_sqlserver(idEndereco)
}

module.exports = {
    cadastrar,
    buscarEnderecoPorId
}