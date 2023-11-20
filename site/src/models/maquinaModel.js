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
        return process.env.AMBIENTE = 'desenvolvimento'
            ? database.exec(`select m.nomeMaquina, m.idMaquina, COUNT(if(l.statusLog != 1, 1, null)) as 'componentessobrecarrecados' from log l
        join componente c on l.fkComponente = c.idComponente
        join maquina m on c.fkMaquina = m.idMaquina
        where dataLog = (select dataLog from log order by dataLog desc limit 1)
        and fkLanhouse = ${fkLanhouse}
        group by nomeMaquina, idMaquina, nomeMaquina
        order by 'componentessobrecarrecados' desc`)
            : database.exec(`SELECT m.nomeMaquina, m.idMaquina, COUNT(CASE WHEN l.statusLog != 1 THEN 1 END) as 'componentessobrecarrecados'
        FROM log l
        JOIN componente c ON l.fkComponente = c.idComponente
        JOIN maquina m ON c.fkMaquina = m.idMaquina
        WHERE dataLog = (SELECT TOP 1 dataLog FROM log ORDER BY dataLog DESC)
        AND fkLanhouse = ${fkLanhouse}
        GROUP BY m.nomeMaquina, m.idMaquina
        ORDER BY 'componentessobrecarrecados' DESC`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    buscarMaquinasDaLanHouse,
    buscarMaquinasComponentesForaIdeal
}   
