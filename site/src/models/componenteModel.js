const database = require('../database/config');

function buscarComponentesPorMaquina(fkMaquina) {
    try {
        return database.exec(`SELECT * FROM Componente c JOIN tipoComponente t ON c.fkTipoComponente = t.idTipoComponente WHERE fkMaquina = ${fkMaquina}`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    buscarComponentesPorMaquina
}