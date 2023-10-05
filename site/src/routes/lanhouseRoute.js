const express = require('express')
const lanhouseController = require('../controllers/lanhouseController')
const router = express.Router()

router.post('/cadastrar', (req, res) => {
    lanhouseController.cadastrar(req, res)
})

router.put('/desativar/:idLanHouse', (req, res) => {
    lanhouseController.desativarLanhouse(req, res)
})

router.put('/ativar/:idLanHouse', (req, res) => {
    lanhouseController.ativarLanhouse(req, res)
})

router.post('/cadastrar', (req, res) => {
    lanhouseController.cadastrar(req, res)
})

router.get('/buscarLanHousePorId/:idLanHouse', (req, res) => {
    lanhouseController.buscarLanHousePorId(req, res)
})

router.get('/listarLanhousesPorEmpresa/:idEmpresa', (req, res) => {
    lanhouseController.listarLanhousesPorEmpresa(req, res)
})

module.exports = router