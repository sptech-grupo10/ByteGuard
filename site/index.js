process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

const express = require('express')
const cors = require('cors')
const path = require('path')
// let porta = AMBIENTE_PROCESSO == "desenvolvimento" ? 3000 : 80;
let porta = 3000;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.use('/', require('./src/routes/index'))
app.use('/usuarios', require('./src/routes/usuarioRoute'))
app.use('/enderecos', require('./src/routes/enderecoRoute'))
app.use('/empresas', require('./src/routes/empresaRoute'))
app.use('/representantes', require('./src/routes/representanteRoute'))
app.use('/lanhouses', require('./src/routes/lanhouseRoute'))
app.use('/componentes', require('./src/routes/componenteRoute'))
app.use('/metricas', require('./src/routes/metricaRoute'))
app.use('/especificacoes', require('./src/routes/especificacaoRoute'))
app.use('/maquinas', require('./src/routes/maquinaRoute'))
app.use('/logs', require('./src/routes/logRoute'))

app.listen(porta, () => {
    console.log('Servidor rodando')
})