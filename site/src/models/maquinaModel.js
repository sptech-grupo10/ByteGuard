const database = require('../database/config');

function buscarMaquinasDaLanHouse(fkEmpresa){
    try{
        return database.exec(`select * from maquina where fkLanhouse = ${fkEmpresa}`)
    } catch(e){
        console.log(e);
    }
}

module.exports = {
    buscarMaquinasDaLanHouse
}