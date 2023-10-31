const db = require('../database/config')

function buscarLogPorComponente(fkComponente) {
    return db.exec(`SELECT * FROM Log WHERE fkComponente = ${fkComponente} ORDER BY dataLog DESC LIMIT 5`)
}

module.exports = {
    buscarLogPorComponente
}