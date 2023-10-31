const componenteModel = require('../models/componenteModel');

function buscarCompoentesPorMaquina(req, res) {
    componenteModel.buscarCompoentesPorMaquina(req.params.fkMaquina)
        .then(result => {
            res.json(result)
        })
}

function buscarEspecificacaoComponente(req, res) {
    componenteModel.buscarEspecificacaoComponente(req.params.idMaquina).then(result => {
        res.send(result[0])
    }).catch(e=>{
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    buscarCompoentesPorMaquina,
    buscarEspecificacaoComponente
}
