fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('Disco')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#disco-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#disco-value-espec-${i}`).innerText = espec.valorEspecificacao
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

let metricaDisco
async function buscarMetricasDisco() {
    const resMetricasDisco = await fetch(`/metricas/buscarMetricasComponente/${sessionStorage.getItem('Disco')}`)
    const metricasDisco = await resMetricasDisco.json()
    metricaDisco = metricasDisco
}

buscarMetricasDisco()
buscarLogs()

async function buscarLogs() {
    const resLogDisco = await fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('Disco')}`)
    const logDisco = await resLogDisco.json()

    const resUsouDisco = await fetch(`/logs/buscarSeUsouDiscoHoje/${sessionStorage.getItem('Disco')}`)
    const usouDisco = await resUsouDisco.json()

    resQtdAlertasHoje = await fetch(`/logs/buscarQtdAlertasHoje/${sessionStorage.getItem('Disco')}`)
    qtdAlertasHoje = await resQtdAlertasHoje.json()

    document.querySelector('#qtd-alertas-disco').innerText = qtdAlertasHoje.alertas

    plotarGraficos(`${new Date(logDisco.dataLog).getHours()}:${new Date(logDisco.dataLog).getMinutes()}:${new Date(logDisco.dataLog).getSeconds()}`, logDisco.valor)
}

function plotarGraficos(label, valor) {
    plotarUtilizacaoDonut(valor)
    plotarUtilizacaoLine(label, valor)
    setTimeout(() => {
        buscarLogs()
    }, 2500);
}

function plotarUtilizacaoLine(label, valor) {
    myChartUtilizacaoLine.data.labels.shift()
    myChartUtilizacaoLine.data.datasets[0].data.shift()

    myChartUtilizacaoLine.data.labels.push(label)

    valor > Number(metricaDisco.maxMetrica) || valor < Number(metricaDisco.minMetrica)
        ? myChartUtilizacaoLine.data.datasets[0].borderColor = 'red'
        : myChartUtilizacaoLine.data.datasets[0].borderColor = 'blue'

    myChartUtilizacaoLine.data.datasets[0].data.push(valor)

    myChartUtilizacaoLine.update()
}

function plotarUtilizacaoDonut(valor) {
    myChartUtilizacaoDonut.data.datasets[0].data[0] = valor
    myChartUtilizacaoDonut.data.datasets[0].data[1] = 100 - valor

    myChartUtilizacaoDonut.update()
}

let myChartUtilizacaoDonut = new Chart(
    document.getElementById("disco-grafico-tempo-atividade-line"),
    {
        type: "doughnut",
        data: {
            labels: ["Tempo em atividade (%)", "Tempo em ociosidade (%)"],
            datasets: [
                {
                    label: "",
                    data: [0, 100],
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

let myChartUtilizacaoLine = new Chart(
    document.getElementById("disco-grafico-leitura-gravacao"),
    {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", "", "", "", "", "", ""],
            datasets: [
                {
                    label: "",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    fill: true,
                    borderColor: "#337bff",
                    tension: 0.1,
                },
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    }
)

let myChartDiscoKpi = new Chart(
    document.getElementById("disco-grafico-kpi"),
    {
        type: "bar",
        data: {
            labels: ["", "", "", "", "", "", "", "", "", ""],
            datasets: [
                {
                    label: "",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    fill: true,
                    borderColor: "#337bff",
                    backgroundColor: "#337bff",
                    tension: 0.1,
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

let myChartDiscoLeituraGravacao = new Chart(
    document.getElementById("disco-grafico-leitura-gravacao"),
    {
        type: "line",
        data: {
            labels: ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23", "14:25", "14:27", "14:29"],
            datasets: [
                {
                    label: "Gravação",
                    data: [125, 85, 143, 104, 134, 76, 97, 139, 88, 121, 130, 75, 102],
                    fill: false,
                    borderColor: "#337bff",
                    tension: 0.1,
                },
                {
                    label: "Leitura",
                    data: [6, 14, 3, 18, 9, 5, 12, 1, 16, 7, 10, 19, 2],
                    fill: false,
                    borderColor: "#949494",
                    tension: 0.1,
                }
            ]
        }
    }
)