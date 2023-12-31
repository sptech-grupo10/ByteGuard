const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const router = express.Router()

router.get('/listarUsuariosPorEmpresa/:idEmpresa', (req, res) => {
    usuarioController.listarUsuariosPorEmpresa(req, res)
})

router.put('/desativar/:idUsuario', (req, res) => {
    usuarioController.desativarUsuario(req, res)
})
router.put('/ativar/:idUsuario', (req, res) => {
    usuarioController.ativarUsuario(req, res)
})

router.post('/cadastrar', (req, res) => {
    usuarioController.cadastrar(req, res)
})

router.get(`/login/:email/:senha`, (req, res) => {
    usuarioController.login(req, res)
})

module.exports = router