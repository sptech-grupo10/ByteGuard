const express = require('express')
const usuarioController = require('../controllers/usuarioController')
const router = express.Router()

router.get('/exibirUsuarios', (req, res) => {
    usuarioController.exibirUsuarios(req, res)
})

module.exports = router