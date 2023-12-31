const database = require('../database/config')

function cadastrar(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante) {
    let codigoAcesso = unidade + String(Date.now()).slice(4, 8)
    try {
        database.exec(`INSERT INTO LanHouse (unidade, cnpj, codigoAcesso, fkEndereco, fkEmpresa, fkRepresentante) VALUES ('${unidade}', '${cnpj}', '${codigoAcesso}', ${fkEndereco}, ${fkEmpresa}, ${fkRepresentante})`)
        return database.exec(`SELECT IDENT_CURRENT('LanHouse') as insertId`)
    } catch (e) {
        console.log(e)
    }
}

function buscarLanHousePorId(idLanHouse) {
    try {
        return database.exec(`SELECT * FROM LanHouse WHERE idLanhouse = ${idLanHouse}`)
    } catch (e) {
        console.log(e)
    }
}

function listarLanhousesPorEmpresa(idEmpresa) {
    try {
        return database.exec(`SELECT * FROM LanHouse JOIN Endereco ON LanHouse.fkEndereco = Endereco.idEndereco JOIN Representante ON LanHouse.fkRepresentante = Representante.idRepresentante WHERE LanHouse.fkEmpresa = ${idEmpresa}`)
    } catch (e) {
        console.log(e)
    }
}

function desativarLanhouse(idLanhouse) {
    try {
        return database.exec(`UPDATE LanHouse SET statusLanhouse = 0 WHERE idLanhouse = ${idLanhouse}`)
    } catch (e) {
        console.log(e)
    }
}

function ativarLanhouse(idLanhouse) {
    try {
        return database.exec(`UPDATE LanHouse SET statusLanhouse = 1 WHERE idLanhouse = ${idLanhouse}`)
    } catch (e) {
        console.log(e)
    }
}


module.exports = {
    cadastrar,
    buscarLanHousePorId,
    listarLanhousesPorEmpresa,
    desativarLanhouse,
    ativarLanhouse,
    cadastrar,
    listarLanhousesPorEmpresa
}