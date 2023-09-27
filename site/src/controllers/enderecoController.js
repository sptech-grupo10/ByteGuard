const enderecoModel = require('../models/enderecoModel')

function cadastrar(req, res) {
    const cep = req.body.cepServer,
        logradouro = req.body.logradouroServer,
        numero = req.body.numeroServer,
        bairro = req.body.bairroServer,
        cidade = req.body.cidadeServer,
        uf = req.body.ufServer

    if (!cep || !logradouro || !numero || !bairro || !cidade || !uf) {
        res.stats(400).send('Informações não chegaram ao cadastro')
    } else {
        enderecoModel.cadastrar(cep, logradouro, numero, bairro, cidade, uf)
            .then(result => {
                res.json(result)
            }).catch(e => {
                console.log(`Erro ao cadastrar: ${e.sqlMessage}`)
                res.status(500).json
            })
    }
}

function buscarEnderecoPorId(req, res) {
    enderecoModel.buscarEnderecoPorId(req.params.idEndereco)
        .then(result => {
            res.json(result)
        })
}

module.exports = {
    cadastrar,
    buscarEnderecoPorId
}