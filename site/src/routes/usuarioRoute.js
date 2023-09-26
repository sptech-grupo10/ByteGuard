const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const router = express.Router()

router.get('/exibirUsuarios', (req, res) => {
    usuarioController.exibirUsuarios(req, res)
})

router.post('/cadastrar', (req, res) => {
    usuarioController.cadastrar(req, res)
})

router.get(`/login/:email/:senha`, (req, res) => {
    usuarioController.login(req, res)
})

module.exports = router