const express = require('express')
const especificacaoController = require('../controllers/especificacaoController')
const router = express.Router()

router.get('/buscarEspecificacaoComponente/:idMaquina', (req, res) => {
    especificacaoController.buscarEspecificacaoComponente(req, res)
})

module.exports = router