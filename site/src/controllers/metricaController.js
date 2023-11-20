const metricaModel = require('../models/metricaModel')

function buscarMetricasComponente(req,res) {
    metricaModel.buscarMetricasComponente(req.params.idComponente).then(result=>{
        res.send(result.recordset)
    }).catch(e=>{
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    buscarMetricasComponente
}