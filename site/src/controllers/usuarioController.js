const usuarioModel = require('../models/usuarioModel')

function exibirUsuarios(req, res) {
    usuarioModel.retornarUsuarios()
}

module.exports = {
    exibirUsuarios
}