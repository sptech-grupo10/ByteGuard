const database = require('../database/config')

function cadastrar(nome, telefone, email, cpf, fkEndereco) {
    try {
        return database.exec(
            `INSERT INTO Representante VALUES (null, '${nome}', '${telefone}', '${email}', '${cpf}', ${fkEndereco}, default)`
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