const especificacaoModel = require('../models/especificacaoModel')

function buscarEspecificacaoComponente(req, res) {
    especificacaoModel.buscarEspecificacaoComponente(req.params.idMaquina).then(result => {
        res.send(result.recordset)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    buscarEspecificacaoComponente
}