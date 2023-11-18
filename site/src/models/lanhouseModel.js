const database = require('../database/config')

function cadastrar(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante) {
    let codigoAcesso = unidade + String(Date.now()).slice(4, 8)
    try {
        return database.exec(
            `INSERT INTO LanHouse VALUES (null, '${unidade}', '${cnpj}', default, '${codigoAcesso}', ${fkEndereco}, ${fkEmpresa}, ${fkRepresentante})`,`mysql`
        )
    } catch (e) {
        console.log(e)
    }
    cadastrar_sqlserver(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante,codigoAcesso)
}
function cadastrar_sqlserver(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante,codigoAcesso) {
    
    try {
        return database.exec(
            `INSERT INTO LanHouse VALUES (DEFAULT, '${unidade}', '${cnpj}', DEFAULT, '${codigoAcesso}', ${fkEndereco}, ${fkEmpresa}, ${fkRepresentante})`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function buscarLanHousePorId(idLanHouse) {
    // try {
    //     return database.exec(
    //         `SELECT * FROM LanHouse WHERE idLanhouse = ${idLanHouse}`,`mysql`
    //     )
    // } catch (e) {
    //     console.log(e)
    // }
    buscarLanHousePorId_sqlserver(idLanHouse);
}
function buscarLanHousePorId_sqlserver(idLanHouse) {
    try {
        return database.exec(
            `SELECT * FROM LanHouse WHERE idLanhouse = ${idLanHouse}`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function listarLanhousesPorEmpresa(idEmpresa) {
    // try {
    //     return database.exec(
    //         `SELECT * FROM LanHouse JOIN Endereco ON LanHouse.fkEndereco = Endereco.idEndereco JOIN Representante ON LanHouse.fkRepresentante = Representante.idRepresentante WHERE LanHouse.fkEmpresa = ${idEmpresa}`,`mysql`
    //     )
    // } catch (e) {
    //     console.log(e)
    // }
    listarLanhousesPorEmpresa_sqlserver(idEmpresa)
}
function listarLanhousesPorEmpresa_sqlserver(idEmpresa) {
    try {
        return database.exec(
            `SELECT * FROM LanHouse JOIN Endereco ON LanHouse.fkEndereco = Endereco.idEndereco JOIN Representante ON LanHouse.fkRepresentante = Representante.idRepresentante WHERE LanHouse.fkEmpresa = ${idEmpresa}`,`mssql`
        )
    } catch (e) {
        console.log(e)
    }
}

function desativarLanhouse(idLanhouse) {
    try {
        return database.exec(`
            UPDATE LanHouse SET statusLanhouse = 0 WHERE idLanhouse = ${idLanhouse}`,`mysql`)
    } catch (e) {
        console.log(e)
    }
    desativarLanhouse_sqlserver(idLanhouse);
}
function desativarLanhouse_sqlserver(idLanhouse) {
    try {
        return database.exec(`
        UPDATE LanHouse SET statusLanhouse = 0 WHERE idLanhouse = ${idLanhouse};`,`mssql`)
    } catch (e) {
        console.log(e)
    }
}

function ativarLanhouse(idLanhouse) {
    try {
        return database.exec(`
            UPDATE LanHouse SET statusLanhouse = 1 WHERE idLanhouse = ${idLanhouse}`,`mysql`)
    } catch (e) {
        console.log(e)
    }
    ativarLanhouse_sqlserver(idLanhouse);
}
function ativarLanhouse_sqlserver(idLanhouse) {
    try {
        return database.exec(`
            UPDATE LanHouse SET statusLanhouse = 1 WHERE idLanhouse = ${idLanhouse}`,`mssql`)
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
    buscarLanHousePorId_sqlserver,
    listarLanhousesPorEmpresa,
    desativarLanhouse_sqlserver,
    ativarLanhouse_sqlserver
}