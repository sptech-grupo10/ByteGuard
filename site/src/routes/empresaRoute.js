const express = require('express')
const empresaController = require('../controllers/empresaController')
const router = express.Router()

router.post('/cadastrar', (req, res) => {
    empresaController.cadastrar(req, res)
})

router.get('/buscarEmpresaPorId/:idEmpresa', (req, res) => {
    empresaController.buscarEmpresaPorId(req, res)
})

module.exports = router