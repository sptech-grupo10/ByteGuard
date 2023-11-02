const express = require('express')
const maquinaController = require('../controllers/maquinaController')
const router = express.Router()

router.get('/buscarMaquinasPorLanHouse/:fkLanhouse', (req, res) => {
    maquinaController.buscarMaquinasDaLanHouse(req, res)
})

module.exports = router;