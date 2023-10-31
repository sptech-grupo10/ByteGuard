const database = require('../database/config');

function buscarCompoentesPorMaquina(fkMaquina) {
    try {
        return database.exec(`SELECT * FROM Componente WHERE fkMaquina = ${fkMaquina}`)
    } catch (e) {
        console.log(e)
    }
}

function buscarEspecificacaoComponente(idComponente) {
    return database.exec(`SELECT especificacao FROM EspecificacaoComponente WHERE idEspecificacaoComponente = (SELECT fkEspecificacaoComponente FROM Componente WHERE idComponente = ${idComponente})`)
}

module.exports = {
    buscarCompoentesPorMaquina,
    buscarEspecificacaoComponente
}