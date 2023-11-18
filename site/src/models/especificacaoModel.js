const database = require('../database/config')

function buscarEspecificacaoComponente(fkComponente) {
  
  //  return database.exec(`SELECT * FROM EspecificacaoComponente WHERE fkComponente = ${fkComponente}`,`mysql`);
    buscarEspecificacaoComponente_sqlserver(fkComponente);
}

function buscarEspecificacaoComponente_sqlserver(fkComponente){
    return database.exec(`SELECT * FROM EspecificacaoComponente WHERE fkComponente = ${fkComponente}`,`mssql`)

}

module.exports = {
    buscarEspecificacaoComponente,

    buscarEspecificacaoComponente_sqlserver
}