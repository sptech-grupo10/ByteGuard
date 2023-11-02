const express = require('express')
const logController = require('../controllers/logController')
const router = express.Router()

router.get('/buscarLogComponente/:fkComponente', (req, res) => {
    logController.buscarLogPorComponente(req, res)
})

module.exports = router