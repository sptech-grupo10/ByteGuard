const database = require('../database/config')

function cadastrar(unidade, fkEndereco, fkEmpresa, fkRepresentante) {
    try {
        return database.exec(
            `INSERT INTO LanHouse VALUES (null, '${unidade}', ${fkEndereco}, ${fkEmpresa}, ${fkRepresentante})`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarLanHousePorId(idLanHouse) {
    try {
        return database.exec(
            `SELECT * FROM LanHouse WHERE idLanhouse = ${idLanHouse}`
        )
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarLanHousePorId
}