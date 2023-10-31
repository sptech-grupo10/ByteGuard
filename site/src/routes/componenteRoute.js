const express = require('express')
const componenteController = require('../controllers/componenteController')
const router = express.Router()

router.get('/buscarComponentesPorMaquina/:fkMaquina', (req, res) => {
    componenteController.buscarComponentesPorMaquina(req, res)
})

module.exports = router