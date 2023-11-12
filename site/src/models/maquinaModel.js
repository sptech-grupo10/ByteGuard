const database = require('../database/config');

function buscarMaquinasDaLanHouse(fkEmpresa) {
    try {
        return database.exec(`select * from maquina where fkLanhouse = ${fkEmpresa}`)
    } catch (e) {
        console.log(e);
    }
}

function buscarMaquinasComponentesForaIdeal(fkLanhouse) {
    try {
        return database.exec(`select m.nomeMaquina, count(c.idComponente) as 'componentessobrecarrecados' from log l
        join componente c on l.fkComponente = c.idComponente
        join maquina m on c.fkMaquina = m.idMaquina
        where dataLog = (select dataLog from log order by dataLog desc limit 1)
        and fkLanhouse = ${fkLanhouse}
        and l.statusLog != 1
        group by nomeMaquina
        order by 'componentessobrecarrecados' desc`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    buscarMaquinasDaLanHouse,
    buscarMaquinasComponentesForaIdeal
}