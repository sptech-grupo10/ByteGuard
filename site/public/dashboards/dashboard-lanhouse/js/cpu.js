let metricaCPU

fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

fetch(`${window.location.origin}/metricas/buscarMetricasComponente/${sessionStorage.getItem('Processador')}`).then(res => res.json().then(metricas => {
    metricaCPU = metricas;
})).then(() => {
    buscarLogs()
})

fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('Processador')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#cpu-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#cpu-value-espec-${i}`).innerText = espec.valorEspecificacao
    })
}))

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

document.querySelectorAll('.user-cargo').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('tipoUsuario') == 1 ? "admin" : "user"
})

document.querySelectorAll('#maquina-atual').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('nomeMaquina')
})

async function buscarLogs() {
    resLogsComponente = await fetch(`${window.location.origin}/logs/buscarLogComponente/${sessionStorage.getItem('Processador')}`)
    log = await resLogsComponente.json()
    plotarGraficos(`${new Date(log.dataLog).getHours()}:${new Date(log.dataLog).getMinutes()}:${new Date(log.dataLog).getSeconds()}`, log.valor)

    resMinMaxMinAtras = await fetch(`/logs/buscarMinMaxLogMinsAtras/${sessionStorage.getItem('Processador')}/5`)
    MinMaxMinAtras = await resMinMaxMinAtras.json()

    plotarKpis(MinMaxMinAtras.min, MinMaxMinAtras.max)
}

function plotarKpis(min5min, max5min) {
    plotarKpiUtilizacao5MinAtras(min5min, max5min)
}

function plotarKpiUtilizacao5MinAtras(min5min, max5min) {
    document.querySelector('#kpi-cpu-min').innerText = `${min5min}%`
    document.querySelector('#kpi-cpu-max').innerText = `${max5min}%`
}

function plotarGraficos(label, valor) {
    plotarUtilizacaoLine(label, valor)
    plotarUtilizacaoDonut(valor)

    setTimeout(() => {
        buscarLogs()
    }, 2500);
}

function plotarUtilizacaoDonut(valor) {
    myChartCPUUsoDonut.data.datasets[0].data[0] = valor
    myChartCPUUsoDonut.data.datasets[0].data[1] = 100 - valor

    myChartCPUUsoDonut.update()
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

let myChartCPUUsoDonut = new Chart(
    document.getElementById("cpu-grafico-utilizacao-donut"),
    {
        type: "doughnut",
        data: {
            labels: ["Utilizado (%)", "Não utilizado (%)"],
            datasets: [
                {
                    label: "",
                    data: [100, 0],
                    backgroundColor: ["#337bff", "#D9D9D9"]
                },
            ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            }
        }
    }
);

// Adicionando gráfico criado em div na tela
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