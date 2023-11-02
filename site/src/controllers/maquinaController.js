const maquinaModel = require('../models/maquinaModel');

function buscarMaquinasDaLanHouse(req, res) {
    maquinaModel.buscarMaquinasDaLanHouse(req.params.fkLanhouse)
        .then(result => {
            res.json(result)
        })
}

module.exports ={
    buscarMaquinasDaLanHouse
}