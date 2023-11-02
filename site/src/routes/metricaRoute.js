const express = require('express')
const metricaController = require('../controllers/metricaController')
const router = express.Router()

router.get(`/buscarMetricasComponente/:idComponente`, (req, res) => {
    metricaController.buscarMetricasComponente(req, res)
})

module.exports = router