const database = require('../database/config')

function buscarEspecificacaoComponente(fkComponente) {
    return database.exec(`SELECT * FROM EspecificacaoComponente WHERE fkComponente = ${fkComponente}`)
}

module.exports = {
    buscarEspecificacaoComponente
}