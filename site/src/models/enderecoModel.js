const database = require('../database/config')

function cadastrar(cep, logradouro, numero, bairro, cidade, uf) {
    try {
        database.exec(`INSERT INTO Endereco (cep, logradouro, numero, bairro, cidade, uf) VALUES ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}')`)
        return database.exec(`SELECT IDENT_CURRENT('Endereco') as insertId`)
    } catch (e) {
        console.log(`Erro ao cadastrar endereco: ${e}`)
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