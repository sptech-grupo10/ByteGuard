const express = require('express')
const componenteController = require('../controllers/componenteController')
const router = express.Router()

router.get('/buscarCompoentesPorMaquina/:fkMaquina', (req, res) => {
    componenteController.buscarCompoentesPorMaquina(req, res)
})

module.exports = router