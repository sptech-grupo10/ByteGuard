const database = require('../database/config')

function buscarMetricasComponente(idComponente){
   // return database.exec(`SELECT minMetrica, maxMetrica, unidadeMedida FROM MetricaComponente WHERE idMetricaComponente = (SELECT fkMetricaComponente FROM Componente WHERE idComponente = ${idComponente})`,`mysql`)
   buscarMetricasComponente_sqlserver(idComponente);
}
function buscarMetricasComponente_sqlserver(idComponente){
    return database.exec(`SELECT minMetrica, maxMetrica, unidadeMedida FROM MetricaComponente WHERE idMetricaComponente = (SELECT fkMetricaComponente FROM Componente WHERE idComponente = ${idComponente})`,`mysql`)
}

module.exports = {
    buscarMetricasComponente,
 buscarMetricasComponente_sqlserver
}