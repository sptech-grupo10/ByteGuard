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

function buscarSeUsouDisco(fkDisco) {
    return db.exec(`WITH ValoresDiarios AS (
        SELECT 
            datalog,
            valor,
            LAG(valor) OVER (ORDER BY datalog) AS valor_anterior
        FROM 
            log
        WHERE 
            CONVERT(DATE, datalog) = CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard Time') 
        AND fkComponente = ${fkDisco}
    )
    SELECT 
        datalog,
        MAX(valor) AS valor_atual,
        MAX(valor_anterior) AS valor_anterior
    FROM 
        ValoresDiarios
    GROUP BY 
        datalog
    HAVING 
        MAX(valor) <> MAX(valor_anterior)`)
}

function buscarQtdAlertasHoje(fkComponente) {
    return db.exec(`select count(idLog) as alertas from log where fkComponente = ${fkComponente}
    and convert(date, datalog) = CONVERT(DATE, GETDATE() AT TIME ZONE 'UTC' AT TIME ZONE 'E. South America Standard Time') and statusLog != 1`)
}

module.exports = {
    buscarLogPorComponente,
    buscarLogUploadRede,
    buscarLogDownloadRede,
    buscarMinMaxLogMinsAtras,
    buscarLogsComponenteHoje,
    buscarSeUsouDisco,
    buscarQtdAlertasHoje
}