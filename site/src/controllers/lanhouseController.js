const lanhouseModel = require('../models/lanhouseModel')

function cadastrar(req, res) {
    const unidade = req.body.unidadeServer,
        fkEndereco = req.body.fkEnderecoServer,
        fkEmpresa = req.body.fkEmpresaServer,
        fkRepresentante = req.body.fkRepresentanteServer

    if (!unidade || !fkEndereco || !fkEmpresa || !fkRepresentante) {
        res.stats(400).send('Informações não chegaram ao cadastro')
    } else {
        lanhouseModel.cadastrar(unidade, fkEndereco, fkEmpresa, fkRepresentante)
            .then(result => {
                res.json(result)
            }).catch(e => {
                console.log(`Erro ao cadastrar: ${e.sqlMessage}`)
                res.status(500).json
            })
    }
}

function buscarLanHousePorId(req, res) {
    lanhouseModel.buscarLanHousePorId(req.params.idLanHouse)
        .then(result => {
            res.json(result)
        })
}

module.exports = {
    cadastrar,
    buscarLanHousePorId
}