const componenteModel = require('../models/componenteModel');

function buscarCompoentesPorMaquina(req, res){
        componenteModel.buscarCompoentesPorMaquina(req.params.fkMaquina)
        .then(result => {
            res.json(result)
        })
}

module.exports = {
    buscarCompoentesPorMaquina
}
