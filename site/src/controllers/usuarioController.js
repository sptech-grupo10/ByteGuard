const usuarioModel = require('../models/usuarioModel')

function exibirUsuarios(req, res) {
    usuarioModel.retornarUsuarios()
}

function cadastrar(req, res) {
    let nome = req.body.nomeServer
    let email = req.body.emailServer
    let senha = req.body.senhaServer

    if (!nome || !email || !senha) {
        res.status(400).send('Informação não chegou ao cadastro')
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(result => {
                res.json(result)
            }).catch(e => {
                console.log(`Erro ao cadastrar: ${e.sqlMessage}`)
                res.status(500).json
            })
    }
}

module.exports = {
    exibirUsuarios,
    cadastrar
}