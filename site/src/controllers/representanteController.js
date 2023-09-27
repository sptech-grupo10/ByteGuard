const representanteModel = require('../models/representanteModel')

function cadastrar(req, res) {
    const nome = req.body.nomeServer,
        telefone = req.body.telefoneServer,
        email = req.body.emailServer,
        fkEndereco = req.body.fkEnderecoServer

    if (!nome || !telefone || !email || !fkEndereco) {
        res.status(400).send('Informação não chegaram ao cadastro')
    } else {
        representanteModel.cadastrar(nome, telefone, email, fkEndereco)
            .then(result => {
                res.json(result)
            }).catch(e => {
                console.log(`Erro ao cadastrar: ${e.sqlMessage}`)
                res.status(500).json
            })
    }
}

function buscarRepresentantePorId(req, res) {
    representanteModel.buscarRepresentantePorId(req.params.idRepresentante)
        .then(result => {
            res.json(result)
        })
}

module.exports = {
    cadastrar,
    buscarRepresentantePorId
}