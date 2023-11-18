const database = require('../database/config')

function cadastrar(nome, telefone, email, cpf) {
    try {
        return database.exec(`INSERT INTO Representante VALUES (null, '${nome}', '${telefone}', '${email}', '${cpf}', default)`)
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(nome, telefone, email, cpf);
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