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

document.querySelectorAll('.print-username').forEach(usernameClass => {
    usernameClass.innerText = sessionStorage.getItem('nomeUsuario')
})

async function buscarComponentes() {
    const resComponentes = await fetch(`${window.location.origin}/componentes/buscarComponentesPorMaquina/${sessionStorage.getItem('idMaquina')}`)
    const componentes = await resComponentes.json()
    componentes.forEach(componente => {
        sessionStorage.setItem(componente.tipoComponente, componente.idComponente)
    })

    buscarMetricasComponente()
}

buscarComponentes()

function acessarCPU() {
    window.location = "cpu.html"
}

function acessarRede() {
    window.location = "rede.html"
}

function acessarDisco() {
    window.location = "disco.html"
}

function acessarPlacaDeVideo() {
    window.location = "#"
}

function acessarMemoria() {
    window.location = "memoria.html"
}


// Criando estrutura para plotar gráfico - labels
let labelsCPU = ["Utilizado (%)", "Não utilizado (%)"];

// Criando estrutura para plotar gráfico - dados
let dadosCPU = {
    labels: labelsCPU,
    datasets: [{
        label: "",
        data: [61, 39],
        backgroundColor: ["#337bff", "#D9D9D9"]
    },]
};

// Criando estrutura para plotar gráfico - config
const configCPU = {
    type: "doughnut",
    data: dadosCPU,
};

let metricaCPU, metricaMemoria
async function buscarMetricasComponente() {
    const resMetricaCPU = await fetch(`${window.location.origin}/metricas/buscarMetricasComponente/${sessionStorage.getItem('Processador')}`)
    const metricasCPU = await resMetricaCPU.json()
    metricaCPU = metricasCPU;

    const resMetricaMemoria = await fetch(`${window.location.origin}/metricas/buscarMetricasComponente/${sessionStorage.getItem('RAM')}`)
    const metricasMemoria = await resMetricaMemoria.json()
    metricaMemoria = metricasMemoria;

    buscarLogs()
}

function buscarLogs() {
    fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('Processador')}`).then(res => res.json().then(log => {
        plotarUtilizacaoLine(`${new Date(log.dataLog).getHours()}:${new Date(log.dataLog).getMinutes()}:${new Date(log.dataLog).getSeconds()}`, log.valor)
    }))

    fetch(`/logs/buscarLogRede/${sessionStorage.getItem('Rede')}`).then(res => res.json().then(log => {
        plotarKPIRede(log.download.valor, log.upload.valor)
    }))

    fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('RAM')}`).then(res => res.json().then(log => {
        plotarGraficoRAM(`${new Date(log.dataLog).getHours()}:${new Date(log.dataLog).getMinutes()}:${new Date(log.dataLog).getSeconds()}`, log.valor)
    }))
}

function plotarKPIRede(valorDownload, valorUpload) {
    document.querySelector('#overview-dado-download').value = valorDownload
    document.querySelector('#overview-dado-upload').value = valorUpload
}

function plotarUtilizacaoLine(label, valor) {
    myChartCPUUsoLine.data.labels.shift()
    myChartCPUUsoLine.data.datasets[0].data.shift()

    myChartCPUUsoLine.data.labels.push(label)

    valor > Number(metricaCPU.maxMetrica) || valor < Number(metricaCPU.minMetrica)
        ? myChartCPUUsoLine.data.datasets[0].borderColor = 'red'
        : myChartCPUUsoLine.data.datasets[0].borderColor = 'blue'

    myChartCPUUsoLine.data.datasets[0].data.push(valor)

    myChartCPUUsoLine.update()
}

function plotarGraficoRAM(label, valor) {
    plotarUtilizacaoRAMLine(label, valor)

    setTimeout(() => {
        buscarLogs()
    }, 2500);
}

function plotarUtilizacaoRAMLine(label, valor) {
    myChartMemoria.data.labels.shift()
    myChartMemoria.data.datasets[0].data.shift()

    myChartMemoria.data.labels.push(label)

    valor > Number(metricaMemoria.maxMetrica) || valor < Number(metricaMemoria.minMetrica)
        ? myChartMemoria.data.datasets[0].borderColor = 'red'
        : myChartMemoria.data.datasets[0].borderColor = 'blue'

    myChartMemoria.data.datasets[0].data.push(valor)

    myChartMemoria.update()
}

var myChartCPUUsoLine = new Chart(
    document.getElementById("cpu-grafico-utilizacao-line"),
    {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", "", "", ""],
            datasets: [
                {
                    label: "Utilizacao (%)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    fill: true,
                    borderColor: "#337bff",
                    tension: 0.1
                },
            ]
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
);


// Criando estrutura para plotar gráfico - labels
let labelsDisco = ["Utilizado (%)", "Não utilizado (%)"];

// Criando estrutura para plotar gráfico - dados
let dadosDisco = {
    labels: labelsDisco,
    datasets: [{
        label: "",
        data: [27, 63],
        backgroundColor: ["#337bff", "#D9D9D9"]
    },]
};

// Criando estrutura para plotar gráfico - config
const configDisco = {
    type: "doughnut",
    data: dadosDisco,
};

// Adicionando gráfico criado em div na tela
let myChartDisco = new Chart(
    document.getElementById("overview-grafico-disco"),
    configDisco
);


// Criando estrutura para plotar gráfico - labels
let labelsPlacaDeVideo = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23",
    "14:25", "14:27", "14:29"
];

// Criando estrutura para plotar gráfico - dados
let dadosPlacaDeVideo = {
    labels: labelsPlacaDeVideo,
    datasets: [{
        label: "",
        data: [30, 34, 33, 35, 36, 34, 32, 32, 33, 35, 36, 34, 35],
        fill: true,
        borderColor: "#337bff",
        tension: 0.1,
    },]
};

// Criando estrutura para plotar gráfico - config
const configPlacaDeVideo = {
    type: "line",
    data: dadosPlacaDeVideo,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartPlacaDeVideo = new Chart(
    document.getElementById("overview-grafico-placa-de-video"),
    configPlacaDeVideo
);

let myChartMemoria = new Chart(
    document.getElementById("overview-grafico-memoria"),
    {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", "", "", ""],
            datasets: [{
                label: "Uso da memória",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
);