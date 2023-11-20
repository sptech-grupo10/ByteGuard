const database = require('../database/config')

function cadastrar(nome, telefone, email, cpf) {
    try {
        database.exec(`INSERT INTO Representante (nome, telefone, email, cpf) VALUES ('${nome}', '${telefone}', '${email}', '${cpf}')`)
        return database.exec(`SELECT IDENT_CURRENT('Representante') as insertId`)
    } catch (e) {
        console.log(`Erro ao cadastrar representante: ${e}`)
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