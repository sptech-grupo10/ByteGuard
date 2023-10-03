const express = require('express')
const enderecoController = require('../controllers/enderecoController')
const router = express.Router()

router.post('/cadastrar', (req, res) => {
    enderecoController.cadastrar(req, res)
})

router.get('/buscarEnderecoPorId/:idEndereco', (req, res) => {
    enderecoController.buscarEnderecoPorId(req, res)
})

module.exports = router