const express = require('express')
const lanhouseController = require('../controllers/lanhouseController')
const router = express.Router()

router.post('/cadastrar', (req, res) => {
    lanhouseController.cadastrar(req, res)
})

router.get('/buscarLanHousePorId/:idLanHouse', (req, res) => {
    lanhouseController.buscarLanHousePorId(req, res)
})

router.get('/listar', (req, res) => {
    lanhouseController.listar(req, res)
})

module.exports = router