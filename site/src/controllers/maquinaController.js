const maquinaModel = require('../models/maquinaModel');

function buscarMaquinasDaLanHouse(req, res) {
    maquinaModel.buscarMaquinasDaLanHouse(req.params.fkLanhouse)
        .then(result => {
            res.json(result)
        })
}

async function buscarMaquinasComponentesForaIdeal(req,res) {
    try{
        results = await maquinaModel.buscarMaquinasComponentesForaIdeal(req.params.fkLanhouse)
        res.send(results)
    }catch(e) {
        res.status(500).end()
    }
    
}

module.exports ={
    buscarMaquinasDaLanHouse,
    buscarMaquinasComponentesForaIdeal
}