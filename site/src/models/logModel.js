const db = require('../database/config')

function buscarLogPorComponente(fkComponente) {

    //return db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} ORDER BY dataLog DESC LIMIT 1`,`mysql`);
    buscarLogPorComponente_sqlserver(fkComponente);
}
function buscarLogPorComponente_sqlserver(fkComponente) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} ORDER BY dataLog DESC OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY`,`mssql`)
}

function buscarLogUploadRede(idRede) {
//    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Upload%' ORDER BY dataLog DESC LIMIT 1`,`mysql`)
    buscarLogUploadRede_sqlserver(idRede);
}
function buscarLogUploadRede_sqlserver(idRede) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Upload%' ORDER BY dataLog DESC OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY`,`mssql`)
}

function buscarLogDownloadRede(idRede) {
    //return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Download%' ORDER BY dataLog DESC LIMIT 1`,`mysql`)
    buscarLogDownloadRede_sqlserver(idRede);
}
function buscarLogDownloadRede_sqlserver(idRede) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Download%' ORDER BY dataLog DESC OFFSET 0 ROWS FETCH FIRST 1 ROW ONLY`,`mysql`)
}

module.exports = {
    buscarLogPorComponente,
    buscarLogUploadRede,
    buscarLogDownloadRede,

    buscarLogPorComponente_sqlserver,
    buscarLogUploadRede_sqlserver,
    buscarLogDownloadRede_sqlserver
}