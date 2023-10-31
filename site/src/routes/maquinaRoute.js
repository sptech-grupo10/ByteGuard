const express = require('express')
const maquinaController = require('../controllers/maquinaController')
const router = express.Router()

router.get('/buscarMaquinasDaLanHouse/:fkLanhouse', (req, res) => {
    maquinaController.buscarMaquinasDaLanHouse(req, res)
})

module.exports = router;