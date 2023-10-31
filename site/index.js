const express = require('express')
const cors = require('cors')
const path = require('path')

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
app.use('/maquinas', require('./src/routes/maquinaRoute'))

app.listen('3000', () => {
    console.log('Servidor rodando')
})