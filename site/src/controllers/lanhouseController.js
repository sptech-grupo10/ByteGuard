const lanhouseModel = require('../models/lanhouseModel')

function cadastrar(req, res) {
    const unidade = req.body.unidadeServer,
        cnpj = req.body.cnpjServer,
        codigoAcesso = req.body.codigoAcessoServer,
        fkEndereco = req.body.fkEnderecoServer,
        fkEmpresa = req.body.fkEmpresaServer,
        fkRepresentante = req.body.fkRepresentanteServer

    if (!unidade || !fkEndereco || !cnpj || !fkEmpresa || !fkRepresentante) {
        res.stats(400).send('Informações não chegaram ao cadastro')
    } else {
        lanhouseModel.cadastrar(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante)
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

function listarLanhousesPorEmpresa(req, res) {
    lanhouseModel.listarLanhousesPorEmpresa(req.params.idEmpresa).then(result => {
        res.json(result)
    })
}

function desativarLanhouse(req, res) {
    lanhouseModel.desativarLanhouse(req.params.idLanHouse).then(result => {
        res.json(result)
    })
}

function ativarLanhouse(req, res) {
    lanhouseModel.ativarLanhouse(req.params.idLanHouse).then(result => {
        res.json(result)
    })
}

module.exports = {
    cadastrar,
    buscarLanHousePorId,
    listarLanhousesPorEmpresa,
    desativarLanhouse,
    ativarLanhouse
}