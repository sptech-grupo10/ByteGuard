const database = require('../database/config')

function cadastrar(cep, logradouro, numero, bairro, cidade, uf) {
    try {
        return database.exec(
            `INSERT INTO Endereco VALUES (null, '${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}')`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(cep, logradouro, numero, bairro, cidade, uf);
}
function cadastrar_sqlserver(cep, logradouro, numero, bairro, cidade, uf) {
    try {
        return database.exec(
            `INSERT INTO Endereco VALUES (DEFAULT, '${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}')`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarEnderecoPorId(idEndereco) {
    // try {
    //     return database.exec(
    //         `SELECT * FROM Endereco WHERE idEndereco = ${idEndereco}`,`mysql`
    //     )
    // } catch (e) {
    //     console.log(e)
    // }
    buscarEnderecoPorId_sqlserver(idEndereco)
}
function buscarEnderecoPorId_sqlserver(idEndereco) {
    try {
        return database.exec(
            `SELECT * FROM Endereco WHERE idEndereco = ${idEndereco}`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarEnderecoPorId,

    cadastrar_sqlserver,
    buscarEnderecoPorId_sqlserver
}