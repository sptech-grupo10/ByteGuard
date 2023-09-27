const database = require('../database/config')

function cadastrar(nome, telefone, email, fkEndereco) {
    try {
        return database.exec(
            `INSERT INTO Representante VALUES (null, '${nome}', '${telefone}', '${email}', ${fkEndereco})`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarRepresentantePorId(idRepresentante) {
    try {
        return database.exec(
            `SELECT * FROM Representante WHERE idRepresentante = ${idRepresentante}`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarRepresentantePorId
}