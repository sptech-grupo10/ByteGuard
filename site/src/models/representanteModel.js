const database = require('../database/config')

function cadastrar(nome, telefone, email, cpf) {
    try {
        return database.exec(
            `INSERT INTO Representante VALUES (null, '${nome}', '${telefone}', '${email}', '${cpf}', default)`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(nome, telefone, email, cpf);
}
function cadastrar_sqlserver(nome, telefone, email, cpf) {
    try {
        return database.exec(
            `INSERT INTO Representante VALUES (DEFAULT, '${nome}', '${telefone}', '${email}', '${cpf}', DEFAULT)`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarRepresentantePorId(idRepresentante) {
    try {
        return database.exec(
            `SELECT * FROM Representante WHERE idRepresentante = ${idRepresentante}`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
    buscarRepresentantePorId_sqlserver(idRepresentante);
}
function buscarRepresentantePorId_sqlserver(idRepresentante) {
    try {
        return database.exec(
            `SELECT * FROM Representante WHERE idRepresentante = ${idRepresentante}`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarRepresentantePorId,
    cadastrar_sqlserver,
    buscarRepresentantePorId_sqlserver
}