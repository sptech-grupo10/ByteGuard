const logModel = require('../models/logModel')

function buscarLogPorComponente(req,res) {
    logModel.buscarLogPorComponente(req.params.fkComponente).then(result=>{
        res.send(result[0])
    }).catch(e=>{
        console.log(e)
        res.status(500).json
    })
}

module.exports = {
    buscarLogPorComponente
}