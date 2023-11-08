const logModel = require('../models/logModel')

async function buscarLogPorComponente(req, res) {
    try {
        result = await logModel.buscarLogPorComponente(req.params.fkComponente)

        res.send(result[0])
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

async function buscarLogRede(req, res) {
    try {
        resultDownoad = await logModel.buscarLogDownloadRede(req.params.idRede)
        resultUpload = await logModel.buscarLogUploadRede(req.params.idRede)

        res.send({ download: resultDownoad[0], upload: resultUpload[0] })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    buscarLogPorComponente,
    buscarLogRede
}