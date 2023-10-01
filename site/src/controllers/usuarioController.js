const usuarioModel = require('../models/usuarioModel')

function exibirUsuarios(req, res) {
    usuarioModel.retornarUsuarios()
}

function cadastrar(req, res) {
    const nome = req.body.nomeServer,
    email = req.body.emailServer,
    senha = req.body.senhaServer,
    fkLanHouse = req.body.fkLanHouseServer,
    fkEmpresa = req.body.fkEmpresaServer,
    tipoUsuario = req.body.tipoUsuarioServer

    console.log(nome, email, senha, fkLanHouse, fkEmpresa, tipoUsuario);

    if (!nome || !email || !senha || !tipoUsuario) {
        res.status(400).send('Informação não chegaram ao cadastro')
    } else {
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario)
            .then(result => {
                res.json(result)
            }).catch(e => {
                console.log(`Erro ao cadastrar: ${e.sqlMessage}`)
                res.status(500).json
            })
    }
}

function login(req, res) {
    let email = req.params.email
    let senha = req.params.senha

    usuarioModel.login(email, senha)
        .then(result => {
            result.length > 0
            ? res.status(200).json(result)
            : res.status(204).send('Nenhum cadastro encontrado')
        }).catch(e => {
            console.log(`Erro no login: ${e.sqlMessage}`)
            res.status(500).json
        })
}

module.exports = {
    exibirUsuarios,
    cadastrar,
    login
}