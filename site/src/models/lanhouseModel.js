const database = require('../database/config')

function cadastrar(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante) {
    try {
        return database.exec(
            `INSERT INTO LanHouse VALUES (null, '${unidade}', '${cnpj}', default, ${fkEndereco}, ${fkEmpresa}, ${fkRepresentante})`
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

function listarLanhousesPorEmpresa(idEmpresa) {
    try {
        return database.exec(
            `SELECT * FROM LanHouse JOIN Endereco ON LanHouse.fkEndereco = Endereco.idEndereco JOIN Representante ON LanHouse.fkRepresentante = Representante.idRepresentante WHERE LanHouse.fkEmpresa = ${idEmpresa}`
        )
    } catch (e) {
        console.log(e)
    }
}

function desativarLanhouse(idLanhouse) {
    try {
        return database.exec(`
            UPDATE LanHouse SET statusLanhouse = 0 WHERE idLanhouse = ${idLanhouse}
        `)
    } catch (e) {
        console.log(e)
    }
}

function ativarLanhouse(idLanhouse) {
    try {
        return database.exec(`
            UPDATE LanHouse SET statusLanhouse = 1 WHERE idLanhouse = ${idLanhouse}
        `)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    cadastrar,
    buscarLanHousePorId,
    listarLanhousesPorEmpresa,
    desativarLanhouse,
    ativarLanhouse
}