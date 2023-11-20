const usuarioModel = require('../models/usuarioModel')

function listarUsuariosPorEmpresa(req, res) {
    usuarioModel.listarUsuariosPorEmpresa(req.params.idEmpresa).then(result => {
        res.json(result)
    }).catch(e => {
        console.log(e)
        res.status(500).json
    })
}

function cadastrar(req, res) {
    const nome = req.body.nomeServer,
        email = req.body.emailServer,
        senha = req.body.senhaServer,
        fkLanHouse = req.body.fkLanHouseServer,
        fkEmpresa = req.body.fkEmpresaServer,
        tipoUsuario = req.body.tipoUsuarioServer

    if (!nome || !email || !senha || !tipoUsuario) {
        res.status(400).send('Informação não chegaram ao cadastro')
    } else {
        usuarioModel.cadastrar(nome, email, senha, fkEmpresa, fkLanHouse, tipoUsuario)
            .then(result => {
                res.json(result.recordset[0])
            }).catch(e => {
                console.log(`Erro ao cadastrar: ${e}`)
                res.status(500).json
            })
    }
}

function login(req, res) {
    usuarioModel.login(req.params.email, req.params.senha)
        .then(result => {
            Object.keys(result).length > 0
                ? res.status(200).json(result)
                : res.status(204).send('Nenhum cadastro encontrado')
        }).catch(e => {
            console.log(`Erro no login: ${e}`)
            res.status(500).json
        })
}

function ativarUsuario(req, res) {
    usuarioModel.ativarUsuario(req.params.idUsuario)
        .then(result => {
            res.status(200).json(result)
        }).catch(e => {
            console.log(`Erro na ativação: ${e}`)
            res.status(500).json
        })

}
function desativarUsuario(req, res) {
    usuarioModel.desativarUsuario(req.params.idUsuario)
        .then(result => {
            res.status(200).json(result)
        }).catch(e => {
            console.log(`Erro na desativação: ${e}`)
            res.status(500).json
        })
}

module.exports = {
    listarUsuariosPorEmpresa,
    cadastrar,
    login,
    ativarUsuario,
    desativarUsuario
}