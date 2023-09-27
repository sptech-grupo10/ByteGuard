const express = require('express')
const representanteController = require('../controllers/representanteController')
const router = express.Router()

router.post('/cadastrar', (req, res) => {
    representanteController.cadastrar(req, res)
})

router.get('/buscarRepresentantePorId/:idRepresentante', (req, res) => {
    representanteController.buscarRepresentantePorId(req, res)
})

module.exports = router