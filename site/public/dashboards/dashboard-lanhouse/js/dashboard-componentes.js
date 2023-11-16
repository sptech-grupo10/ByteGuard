document.querySelector(".maquina-atual").innerText = sessionStorage.getItem('nomeMaquina')

fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
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

let metricaCPU, metricaMemoria
async function buscarMetricasComponente() {
    const resMetricaCPU = await fetch(`${window.location.origin}/metricas/buscarMetricasComponente/${sessionStorage.getItem('Processador')}`)
    const metricasCPU = await resMetricaCPU.json()
    metricaCPU = metricasCPU;

    const resMetricaMemoria = await fetch(`${window.location.origin}/metricas/buscarMetricasComponente/${sessionStorage.getItem('RAM')}`)
    const metricasMemoria = await resMetricaMemoria.json()
    metricaMemoria = metricasMemoria;

    buscarLogs()

    setInterval(() => {
        buscarLogs()
    }, 2000);
}

async function buscarLogs() {
    const resCpu = await fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('Processador')}`)
    const logCpu = await resCpu.json()

    const resDisco = await fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('Disco')}`)
    const logDisco = await resDisco.json()

    const resRede = await fetch(`/logs/buscarLogRede/${sessionStorage.getItem('Rede')}`)
    const logRede = await resRede.json()

    const resRam = await fetch(`/logs/buscarLogComponente/${sessionStorage.getItem('RAM')}`)
    const logRam = await resRam.json()

    plotarUtilizacaoCpu(`${new Date(logCpu.dataLog).getHours()}:${new Date(logCpu.dataLog).getMinutes()}:${new Date(logCpu.dataLog).getSeconds()}`, logCpu.valor)
    plotarUtilizacaoDisco(logDisco.valor)
    plotarKPIRede(logRede.download.valor, logRede.upload.valor)
    plotarUtilizacaoRAMLine(`${new Date(logRam.dataLog).getHours()}:${new Date(logRam.dataLog).getMinutes()}:${new Date(logRam.dataLog).getSeconds()}`, logRam.valor)

    let statusCpuIcon = document.querySelector('.status-componente[componente=CPU]')
    let statusDiscoIcon = document.querySelector('.status-componente[componente=Disco]')
    let statusRamIcon = document.querySelector('.status-componente[componente=RAM]')

    switch (logCpu.statusLog) {
        case 1:
            statusCpuIcon.classList = ['status-componente ideal']
            break
        case 2:
            statusCpuIcon.classList = ['status-componente atencao']
            break
        case 3:
            statusCpuIcon.classList = ['status-componente critico']
            break
    }

    switch (logDisco.statusLog) {
        case 1:
            statusDiscoIcon.classList = ['status-componente ideal']
            break
        case 2:
            statusDiscoIcon.classList = ['status-componente atencao']
            break
        case 3:
            statusDiscoIcon.classList = ['status-componente critico']
            break
    }

    switch (logRam.statusLog) {
        case 1:
            statusRamIcon.classList = ['status-componente ideal']
            break
        case 2:
            statusRamIcon.classList = ['status-componente atencao']
            break
        case 3:
            statusRamIcon.classList = ['status-componente critico']
            break
    }
}

function plotarKPIRede(valorDownload, valorUpload) {
    document.querySelector('#overview-dado-download').value = valorDownload
    document.querySelector('#overview-dado-upload').value = valorUpload
}

function plotarUtilizacaoCpu(label, valor) {
    myChartCPUUsoLine.data.labels.shift()
    myChartCPUUsoLine.data.datasets[0].data.shift()

    myChartCPUUsoLine.data.labels.push(label)

    valor > Number(metricaCPU.maxMetrica) || valor < Number(metricaCPU.minMetrica)
        ? myChartCPUUsoLine.data.datasets[0].borderColor = 'red'
        : myChartCPUUsoLine.data.datasets[0].borderColor = 'blue'

    myChartCPUUsoLine.data.datasets[0].data.push(valor)

    myChartCPUUsoLine.update()
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

function plotarUtilizacaoDisco(valor) {
    myChartDisco.data.datasets[0].data[0] = valor
    myChartDisco.update()
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

let myChartDisco = new Chart(
    document.getElementById("overview-grafico-disco"),
    {
        type: "doughnut",
        data: {
            labels: ["Utilizado (%)", "Não utilizado (%)"],
            datasets: [{
                label: "",
                data: [0, 100],
                backgroundColor: ["#337bff", "#D9D9D9"]
            }]
        }
    }
)

let myChartPlacaDeVideo = new Chart(
    document.getElementById("overview-grafico-placa-de-video"),
    {
        type: "line",
        data: {
            labels: ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23",
                "14:25", "14:27", "14:29"],
            datasets: [{
                label: "",
                data: [30, 34, 33, 35, 36, 34, 32, 32, 33, 35, 36, 34, 35],
                fill: true,
                borderColor: "#337bff",
                tension: 0.1,
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