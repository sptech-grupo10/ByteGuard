const lanhouseModel = require('../models/lanhouseModel')

async function cadastrar(req, res) {
    const unidade = req.body.unidadeServer,
        cnpj = req.body.cnpjServer,
        fkEndereco = req.body.fkEnderecoServer,
        fkEmpresa = req.body.fkEmpresaServer,
        fkRepresentante = req.body.fkRepresentanteServer

    if (!unidade || !fkEndereco || !cnpj || !fkEmpresa || !fkRepresentante) {
        res.status(400).send('Informações não chegaram ao cadastro')
    } else {
        try {
            const result = await lanhouseModel.cadastrar(unidade, cnpj, fkEndereco, fkEmpresa, fkRepresentante)
            res.json(result.recordset[0])
        } catch (e) {
            console.log(`Erro ao cadastrar: ${e}`)
            res.status(500).end()
        }
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