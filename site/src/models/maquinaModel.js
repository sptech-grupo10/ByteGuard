const database = require('../database/config');

function buscarMaquinasDaLanHouse(fkEmpresa){
    try{
        return database.exec(`select * from maquina where fkLanhouse = ${fkEmpresa}`)
    } catch(e){
        console.log(e);
    }
}

function buscarMaquinasComponentesForaIdeal(fkLanhouse) {
    try{
        return database.exec(`SELECT count(distinct(fkComponente)) as contagem, maquina.nomeMaquina FROM log JOIN componente ON fkComponente = idComponente 
        JOIN maquina on idMaquina = fkMaquina WHERE statusLog != 1 AND fkLanhouse = ${fkLanhouse} GROUP BY nomeMaquina ORDER BY contagem;`)
    }catch(e) {
        console.log(e)
    }
}

module.exports = {
    buscarMaquinasDaLanHouse,
    buscarMaquinasComponentesForaIdeal
}