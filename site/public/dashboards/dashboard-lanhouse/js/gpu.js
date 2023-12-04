fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

document.querySelectorAll('.print-username').forEach(usernameClass => {
    usernameClass.innerText = sessionStorage.getItem('nomeUsuario')
})

document.querySelectorAll('.user-cargo').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('tipoUsuario') == 1 ? "admin" : "user"
})

document.querySelectorAll('#maquina-atual').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('nomeMaquina')
})

const printLanhouse = lanhouse => {
    document.querySelectorAll('.print-lanhouse').forEach(usernameClass => {
        usernameClass.innerText = lanhouse
    })
}

fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            printLanhouse(lanhouse[0].unidade)
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse[0].codigoAcesso
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

let metricaGpu
async function buscarMetricasGpu() {
    const resMetricasGpu = await fetch(`/metricas/buscarMetricasComponente/${sessionStorage.getItem('GPU')}`)
    const metricasGpu = await resMetricasGpu.json()
    metricaGpu = metricasGpu[0]
}

buscarMetricasGpu()
buscarLogs()

async function buscarLogs() {
    const logGpuRes = await fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('GPU')}`)
    const logGpu = await logGpuRes.json()
    plotarGraficos(`${new Date(logGpu.dataLog).getHours()}:${new Date(logGpu.dataLog).getMinutes()}:${new Date(logGpu.dataLog).getSeconds()}`, logGpu.valor)

    resMinMaxMinAtras = await fetch(`/logs/buscarMinMaxLogMinsAtras/${sessionStorage.getItem('GPU')}/5`)
    MinMaxMinAtras = await resMinMaxMinAtras.json()

    resQtdAlertasHoje = await fetch(`/logs/buscarQtdAlertasHoje/${sessionStorage.getItem('GPU')}`)
    qtdAlertasHoje = await resQtdAlertasHoje.json()

    document.querySelector('#qtd-alertas-gpu').innerText = qtdAlertasHoje.alertas

    document.querySelector('#kpi-gpu-min').innerText = `${MinMaxMinAtras.min}%`
    document.querySelector('#kpi-gpu-max').innerText = `${MinMaxMinAtras.max}%`
}

function plotarGraficos(label, valor) {
    plotarUtilizacaoGPULine(label, valor)
    setTimeout(() => {
        buscarLogs()
    }, 2000)
}

function plotarUtilizacaoGPULine(label, valor) {
    myChartUsoGpu.data.labels.shift()
    myChartUsoGpu.data.datasets[0].data.shift()

    myChartUsoGpu.data.labels.push(label)

    valor > Number(metricaGpu.maxMetrica) || valor < Number(metricaGpu.minMetrica)
        ? myChartUsoGpu.data.datasets[0].borderColor = 'red'
        : myChartUsoGpu.data.datasets[0].borderColor = 'blue'

    myChartUsoGpu.data.datasets[0].data.push(valor)

    myChartUsoGpu.update()
}
function plotarUtilizacaoGPULine(label, valor) {
    myChartUsoGpu.data.labels.shift()
    myChartUsoGpu.data.datasets[0].data.shift()

    myChartUsoGpu.data.labels.push(label)

    valor > Number(metricaGpu.maxMetrica) || valor < Number(metricaGpu.minMetrica)
        ? myChartUsoGpu.data.datasets[0].borderColor = 'red'
        : myChartUsoGpu.data.datasets[0].borderColor = 'blue'

    myChartUsoGpu.data.datasets[0].data.push(valor)

    myChartUsoGpu.update()
}

function plotarUtilizacaoGPUDonut(label, valor) {
    myChartUsoGpuDonut.data.labels.shift()
    myChartUsoGpuDonut.data.datasets[0].data.shift()

    myChartUsoGpuDonut.data.labels.push(label)

    valor > Number(metricaGpu.maxMetrica) || valor < Number(metricaGpu.minMetrica)
        ? myChartUsoGpuDonut.data.datasets[0].borderColor = 'red'
        : myChartUsoGpuDonut.data.datasets[0].borderColor = 'blue'

    myChartUsoGpuDonut.data.datasets[0].data.push(valor)

    myChartUsoGpuDonut.update()
}

let myChartUsoGpu = new Chart(
    document.getElementById("gpu-grafico-uso-linha"),
    {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", "", "", ""],
            datasets: [{
                label: "",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                fill: true,
                borderColor: "#337bff",
                tension: 0.1,
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    }
)

let myChartUsoGpuDonut = new Chart(
    document.getElementById("gpu-grafico-uso-donut"),
    {
        type: "doughnut",
        data: {
            labels: ["Total de utilização (%)", "Total sem uso (%)"],
            datasets: [
                {
                    label: "",
                    data: [80, 20],
                    backgroundColor: ["#337bff", "#D9D9D9"]
                },
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    }
)

async function buscarEspecificacaoComponente() {
    const resEspecs = await fetch(`/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('GPU')}`)
    const especs = await resEspecs.json()

    especs.forEach((espec, i) => {
        document.querySelector(`#gpu-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#gpu-value-espec-${i}`).innerText = espec.valorEspecificacao
    })
}

buscarEspecificacaoComponente()


//--------------------------------------------------------------------------------
// Gráfico GPU Uso - Line
let labelsVelocidadeGpuLinha = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18"];

// Criando estrutura para plotar gráfico - dados
let dadosVelocidadeGpuLinha = {
    labels: labelsVelocidadeGpuLinha,
    datasets: [{
        label: "",
        data: [47, 53, 54, 55, 65, 77, 38, 45, 90],
        fill: true,
        borderColor: "#337bff",
    },]
};

// Criando estrutura para plotar gráfico - config
const configVelocidadeGpuLinha = {
    type: "line",
    data: dadosVelocidadeGpuLinha,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

//--------------------------------------------------------------------------------
// Gráfico GPU Uso - Line
let labelsVelocidadeGpuDonut = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18"];

// Criando estrutura para plotar gráfico - dados
let dadosVelocidadeGpuDonut = {
    labels: labelsVelocidadeGpuDonut,
    datasets: [{
        label: "",
        data: [47, 53, 54, 55, 65, 77, 38, 45, 90],
        fill: true,
        borderColor: "#337bff",
    },]
};

// Criando estrutura para plotar gráfico - config
const configVelocidadeGpuDonut = {
    type: "line",
    data: dadosVelocidadeGpuDonut,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartVelocidadeGpuLinha = new Chart(
    document.getElementById("gpu-grafico-velocidade"),
    configVelocidadeGpuLinha
);

// Adicionando gráfico criado em div na tela
let myChartVelocidadeGpuDonut = new Chart(
    document.getElementById("gpu-grafico-uso-donut"),
    configVelocidadeGpuLinha
);