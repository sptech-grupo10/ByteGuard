const express = require('express')
const logController = require('../controllers/logController')
const router = express.Router()

router.get('/buscarLogComponente/:fkComponente', (req, res) => {
    logController.buscarLogPorComponente(req, res)
})

router.get('/buscarLogRede/:idRede', (req, res) => {
    logController.buscarLogRede(req, res)
})

module.exports = router