const database = require('../database/config');

function buscarCompoentesPorMaquina(fkMaquina){
    try{
        return database.exec(`select * from componente where fkMaquina = ${fkMaquina}`)
    } catch(e){
        console.log(e);
    }
}

module.exports = {
    buscarCompoentesPorMaquina
}