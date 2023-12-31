const express = require('express')
const maquinaController = require('../controllers/maquinaController')
const router = express.Router()

router.get('/buscarMaquinasPorLanHouse/:fkLanhouse', (req, res) => {
    maquinaController.buscarMaquinasDaLanHouse(req, res)
})

router.get('/buscarMaquinasComponentesForaIdeal/:fkLanhouse', (req, res) => {
    maquinaController.buscarMaquinasComponentesForaIdeal(req, res)
})

module.exports = router;