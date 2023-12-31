const empresaModel = require('../models/empresaModel')

function cadastrar(req, res) {
    const cnpj = req.body.cnpjServer,
        nomeFantasia = req.body.nomeFantasiaServer,
        razaoSocial = req.body.razaoSocialServer,
        fkRepresentante = req.body.fkRepresentanteServer,
        fkEndereco = req.body.fkEnderecoServer

    if (!cnpj || !nomeFantasia || !razaoSocial || !fkRepresentante || !fkEndereco) {
        res.status(400).send('Informações não chegaram ao cadastro')
    } else {
        empresaModel.cadastrar(cnpj, nomeFantasia, razaoSocial, fkRepresentante, fkEndereco)
            .then(result => {
                res.json(result.recordset[0])
            }).catch(e => {
                console.log(`Erro ao cadastrar empresa: ${e}`)
                res.status(500).json
            })
    }
}

function buscarEmpresaPorId(req, res) {
    empresaModel.buscarEmpresaPorId(req.params.idEmpresa)
        .then(result => {
            res.json(result.recordset[0])
        })
}

module.exports = {
    cadastrar,
    buscarEmpresaPorId
}