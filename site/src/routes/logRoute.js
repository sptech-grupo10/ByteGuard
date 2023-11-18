const express = require('express')
const logController = require('../controllers/logController')
const router = express.Router()

router.get('/buscarLogComponente/:fkComponente', (req, res) => {
    logController.buscarLogPorComponente(req, res)
})

router.get('/buscarLogRede/:idRede', (req, res) => {
    logController.buscarLogRede(req, res)
})

router.get('/buscarMinMaxLogMinsAtras/:fkComponente/:minsAtras', (req, res) => {
    logController.buscarMinMaxLogMinsAtras(req, res)
})

router.get('/buscarLogsComponenteHoje/:fkComponente', (req, res) => {
    logController.buscarLogsComponenteHoje(req, res)
})

module.exports = router