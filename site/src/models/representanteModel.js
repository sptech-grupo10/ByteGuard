const database = require('../database/config')

function cadastrar(nome, telefone, email, cpf) {
    try {
        return database.exec(`INSERT INTO Representante (nome, telefone, email, cpf) VALUES ('${nome}', '${telefone}', '${email}', '${cpf}')`)
    } catch (e) {
        console.log(e)
    }
}

function buscarRepresentantePorId(idRepresentante) {
    try {
        return database.exec(`SELECT * FROM Representante WHERE idRepresentante = ${idRepresentante}`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarRepresentantePorId
}