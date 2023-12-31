fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

let metricaMemoria

fetch(`${window.location.origin}/metricas/buscarMetricasComponente/${sessionStorage.getItem('RAM')}`).then(res => res.json().then(metricas => {
    metricaMemoria = metricas[0]
})).then(() => {
    buscarLogs()
})

fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('RAM')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#ram-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#ram-value-espec-${i}`).value = espec.valorEspecificacao
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
    fetch(`${window.location.origin}/logs/buscarLogComponente/${sessionStorage.getItem('RAM')}`).then(res => res.json().then(log => {
        plotarGraficos(`${new Date(log.dataLog).getHours()}:${new Date(log.dataLog).getMinutes()}:${new Date(log.dataLog).getSeconds()}`, log.valor)
    }))

    resMinMaxMinAtras = await fetch(`/logs/buscarMinMaxLogMinsAtras/${sessionStorage.getItem('RAM')}/5`)
    MinMaxMinAtras = await resMinMaxMinAtras.json()

    resQtdAlertasHoje = await fetch(`/logs/buscarQtdAlertasHoje/${sessionStorage.getItem('RAM')}`)
    qtdAlertasHoje = await resQtdAlertasHoje.json()

    document.querySelector('#qtd-alertas-memoria').innerText = qtdAlertasHoje.alertas

    document.querySelector('#kpi-memoria-min').innerText = `${MinMaxMinAtras.min}%`
    document.querySelector('#kpi-memoria-max').innerText = `${MinMaxMinAtras.max}%`
}

function plotarGraficos(label, valor) {
    // Para demonstração de RAM sobrecarregada, acrescentar 10 ao valor passado como parametro (valor + 10)
    plotarUtilizacaoLine(label, valor)
    plotarUtilizacaoDonut(valor)

    setTimeout(() => {
        buscarLogs()
    }, 2500);
}

function plotarUtilizacaoDonut(valor) {
    myChartMemoriaUsoDonut.data.datasets[0].data[0] = valor
    myChartMemoriaUsoDonut.data.datasets[0].data[1] = 100 - valor

    myChartMemoriaUsoDonut.update()
}

function plotarUtilizacaoLine(label, valor) {
    myChartMemoriaUsoLine.data.labels.shift()
    myChartMemoriaUsoLine.data.datasets[0].data.shift()

    myChartMemoriaUsoLine.data.labels.push(label)

    valor > Number(metricaMemoria.maxMetrica) || valor < Number(metricaMemoria.minMetrica)
        ? myChartMemoriaUsoLine.data.datasets[0].borderColor = 'red'
        : myChartMemoriaUsoLine.data.datasets[0].borderColor = 'blue'

    myChartMemoriaUsoLine.data.datasets[0].data.push(valor)

    myChartMemoriaUsoLine.update()
}

let myChartMemoriaUsoDonut = new Chart(
    document.getElementById("memoria-grafico-uso-donut"),
    {
        type: "doughnut",
        data: {
            labels: ["Utilizado (%)", "Não utilizado (%)"],
            datasets: [{
                label: "",
                data: [100, 0],
                backgroundColor: ["#337bff", "#D9D9D9"]
            }]
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

let myChartMemoriaUsoLine = new Chart(
    document.getElementById("memoria-grafico-uso-line"),
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