const database = require('../database/config')

function buscarMetricasComponente(idComponente) {
    return database.exec(`SELECT minMetrica, maxMetrica, unidadeMedida FROM MetricaComponente WHERE idMetricaComponente = (SELECT fkMetricaComponente FROM Componente WHERE idComponente = ${idComponente})`)
}
module.exports = {
    buscarMetricasComponente
}