const componenteModel = require('../models/componenteModel');

function buscarComponentesPorMaquina(req, res) {
    componenteModel.buscarComponentesPorMaquina(req.params.fkMaquina)
        .then(result => {
            res.send(result.recordset[0])
        }).catch(e=>{
            console.log(e)
            res.status(500).json
        })
}


module.exports = {
    buscarComponentesPorMaquina
}
