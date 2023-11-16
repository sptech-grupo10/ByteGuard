//process.env.AMBIENTE_PROCESSO = "desenvolvimento";
 process.env.AMBIENTE_PROCESSO = "producao";

const express = require('express')
const cors = require('cors')
const path = require('path')
let porta = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3000 : 8080;

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
const corsOptions = {
    origin: 'http://54.159.238.176:8080', // ou 'http://seuDominio.com'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


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

app.listen(porta, '0.0.0.0', () => {
    console.log('Servidor rodando, na porta ' + porta);
});