const db = require('../database/config')

function buscarLogPorComponente(fkComponente) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} ORDER BY dataLog DESC LIMIT 1`)
}

function buscarLogUploadRede(idRede) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Upload%' ORDER BY dataLog DESC LIMIT 1`)
}

function buscarLogDownloadRede(idRede) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${idRede} AND textLog LIKE 'Download%' ORDER BY dataLog DESC LIMIT 1`)
}

module.exports = {
    buscarLogPorComponente,
    buscarLogUploadRede,
    buscarLogDownloadRede
}