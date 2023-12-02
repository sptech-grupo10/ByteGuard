const logModel = require('../models/logModel')

async function buscarLogPorComponente(req, res) {
    try {
        result = await logModel.buscarLogPorComponente(req.params.fkComponente)

        res.send(result.recordset[0])
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

async function buscarLogRede(req, res) {
    try {
        resultDownoad = await logModel.buscarLogDownloadRede(req.params.idRede)
        resultUpload = await logModel.buscarLogUploadRede(req.params.idRede)

        res.send({ download: resultDownoad.recordset[0], upload: resultUpload.recordset[0] })
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

async function buscarMinMaxLogMinsAtras(req, res) {
    try {
        result = await logModel.buscarMinMaxLogMinsAtras(req.params.fkComponente, req.params.minsAtras)
        res.status(200).send(result.recordset[0])
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

async function buscarLogsComponenteHoje(req, res) {
    try {
        result = await logModel.buscarLogsComponenteHoje(req.params.fkComponente)
        res.status(200).send(result.recordset[0])
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    buscarLogPorComponente,
    buscarLogRede,
    buscarMinMaxLogMinsAtras,
    buscarLogsComponenteHoje
}