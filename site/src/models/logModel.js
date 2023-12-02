const db = require('../database/config')

function buscarLogPorComponente(fkComponente) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} ORDER BY dataLog DESC LIMIT 1`);
}

function buscarLogUploadRede(idRede) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Upload%' ORDER BY dataLog DESC LIMIT 1`)
}

function buscarLogDownloadRede(idRede) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Download%' ORDER BY dataLog DESC LIMIT 1`)
}

function buscarMinMaxLogMinsAtras(fkComponente, minsAtras) {
    return process.env.AMBIENTE == 'desenvolvimento'
        ? db.exec(`SELECT MIN(valor) as min, MAX(valor) as max FROM Log where fkComponente = ${fkComponente} AND dataLog >= NOW() - INTERVAL ${minsAtras} MINUTE`)
        : db.exec(`SELECT MIN(valor) as min, MAX(valor) as max FROM Log where fkComponente = ${fkComponente} AND convert(datetime, dataLog) >= convert(datetime, DATEADD(MINUTE, -${minsAtras}, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard Time'))`)
}

function buscarLogsComponenteHoje(fkComponente) {
    return process.env.AMBIENTE == 'desenvolvimento'
        ? db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} AND DATE(dataLog) = CURDATE()`)
        : db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} AND CONVERT(DATE, dataLog) = CAST(GETDATE() AS DATE)`)
}

module.exports = {
    buscarLogPorComponente,
    buscarLogUploadRede,
    buscarLogDownloadRede,
    buscarMinMaxLogMinsAtras,
    buscarLogsComponenteHoje
}