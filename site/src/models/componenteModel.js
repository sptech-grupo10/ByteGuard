const database = require('../database/config');

function buscarComponentesPorMaquina(fkMaquina) {
    // try {
    //     return database.exec(`SELECT * FROM Componente c JOIN tipoComponente t ON c.fkTipoComponente = t.idTipoComponente WHERE fkMaquina = ${fkMaquina}`,`mysql`)
    // } catch (e) {
    //     console.log(e)
    // }
    buscarComponentesPorMaquina_sqlserver(fkMaquina);
}
function buscarComponentesPorMaquina_sqlserver(fkMaquina) {
    try {
        return database.exec(`SELECT * FROM Componente c JOIN tipoComponente t ON c.fkTipoComponente = t.idTipoComponente WHERE fkMaquina = ${fkMaquina}`,`mssql`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    buscarComponentesPorMaquina,

    buscarComponentesPorMaquina_sqlserver,
}