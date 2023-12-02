fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('Rede')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#rede-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#rede-value-espec-${i}`).innerText = espec.valorEspecificacao
    })
    buscarLogs()
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
    resLogRede = await fetch(`/logs/buscarLogRede/${sessionStorage.getItem('Rede')}`)
    log = await resLogRede.json()

    resQtdAlertasHoje = await fetch(`/logs/buscarQtdAlertasHoje/${sessionStorage.getItem('Rede')}`)
    qtdAlertasHoje = await resQtdAlertasHoje.json()

    document.querySelector('#qtd-alertas-rede').innerText = qtdAlertasHoje.alertas

    plotarGraficos(log.download, log.upload)
    plotarKpis(log.download.valor, log.upload.valor)
}

function plotarGraficos(download, upload) {
    plotarRedeDownloadLine(download)
    plotarRedeUploadLine(upload)

    setTimeout(() => {
        buscarLogs()
    }, 2000);
}

function plotarRedeUploadLine(log) {
    chartRedeUpload.data.labels.shift()
    chartRedeUpload.data.datasets[0].data.shift()

    chartRedeUpload.data.labels.push(`${new Date(log.dataLog).getHours()}:${new Date(log.dataLog).getMinutes()}:${new Date(log.dataLog).getSeconds()}`)
    chartRedeUpload.data.datasets[0].data.push(log.valor / 1e+6)

    chartRedeUpload.update()
}

function plotarRedeDownloadLine(log) {
    chartRedeDownload.data.labels.shift()
    chartRedeDownload.data.datasets[0].data.shift()

    chartRedeDownload.data.labels.push(`${new Date(log.dataLog).getHours()}:${new Date(log.dataLog).getMinutes()}:${new Date(log.dataLog).getSeconds()}`)
    chartRedeDownload.data.datasets[0].data.push(log.valor / 1e+9)

    chartRedeDownload.update()
}

function plotarKpis(valorDownload, valorUpload) {
    document.querySelector('#kpi-rede-up').value = valorUpload
    document.querySelector('#kpi-rede-down').value = valorDownload
}

let chartRedeUpload = new Chart(
    document.getElementById("rede-grafico-upload"),
    {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", "", "", ""],
            datasets: [{
                label: "",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                fill: true,
                borderColor: "#337bff"
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    min: 0
                }
            }
        }
    }
)

let chartRedeDownload = new Chart(
    document.getElementById("rede-grafico-download"),
    {
        type: "line",
        data: {
            labels: ["", "", "", "", "", "", "", "", ""],
            datasets: [{
                label: "",
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                fill: true,
                borderColor: "#337bff",
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    min: 0
                }
            }
        }
    }
)