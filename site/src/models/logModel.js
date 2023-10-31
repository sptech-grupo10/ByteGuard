const db = require('../database/config')

function buscarLogPorComponente(idComponente) {
    return db.exec(`SELECT Log FROM Componente WHERE fkComponente = ${idComponente} ORDER BY dataLog DESC LIMIT 1`)
}

module.exports = {
    buscarLogPorComponente
}