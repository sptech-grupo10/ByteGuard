fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('Processador')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#cpu-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#cpu-value-espec-${i}`).innerText = espec.valorEspecificacao
    })
}))

// Gráfico CPU Utilização
// Gráfico CPU Utilização - Donut
let labelsCPUUsoDonut = ["Utilizado (%)", "Não utilizado (%)"];

// Criando estrutura para plotar gráfico - dados
let dadosCPUUsoDonut = {
    labels: labelsCPUUsoDonut,
    datasets: [
        {
            label: "",
            data: [61, 39],
            backgroundColor: ["#337bff", "#D9D9D9"]
        },
    ]
};

// Criando estrutura para plotar gráfico - config
const configCPUUsoDonut = {
    type: "doughnut",
    data: dadosCPUUsoDonut,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartCPUUsoDonut = new Chart(
    document.getElementById("cpu-grafico-utilizacao-donut"),
    configCPUUsoDonut
);

// Gráfico CPU Utilização - Linha
let labelsCPUUsoLine = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23", "14:25", "14:27", "14:29"];

// Criando estrutura para plotar gráfico - dados
let dadosCPUUsoLine = {
    labels: labelsCPUUsoLine,
    datasets: [
        {
            label: "",
            data: [3, 2, 2, 4, 2, 3, 2, 1, 3, 2, 3, 5, 3],
            fill: true,
            borderColor: "#337bff",
            tension: 0.1,
        },
    ]
};

// Criando estrutura para plotar gráfico - config
const configCPUUsoLine = {
    type: "line",
    data: dadosCPUUsoLine,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartCPUUsoLine = new Chart(
    document.getElementById("cpu-grafico-utilizacao-line"),
    configCPUUsoLine
);


// Gráfico CPU velocidade - donut
// Gráfico CPU Velocidade - Donut
let labelsCPUVelocidadeDonut = ["Utilizado (%)", "Não utilizado (%)"];

// Criando estrutura para plotar gráfico - dados
let dadosCPUVelocidadeDonut = {
    labels: labelsCPUVelocidadeDonut,
    datasets: [
        {
            label: "",
            data: [88, 12],
            backgroundColor: ["#337bff", "#D9D9D9"]
        },
    ]
};

// Criando estrutura para plotar gráfico - config
const configCPUVelocidadeDonut = {
    type: "doughnut",
    data: dadosCPUVelocidadeDonut,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartCPUVelocidadeDonut = new Chart(
    document.getElementById("cpu-grafico-velocidade-donut"),
    configCPUVelocidadeDonut
);

// Gráfico CPU Utilização - Linha
let labelsCPUVelocidadeLine = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23", "14:25", "14:27", "14:29"];

// Criando estrutura para plotar gráfico - dados
let dadosCPUVelocidadeLine = {
    labels: labelsCPUVelocidadeLine,
    datasets: [
        {
            label: "",
            data: [0.92, 0.78, 0.84, 0.90, 1.10, 0.88, 0.93, 0.96, 0.79, 0.80, 0.91, 1.20, 1.02],
            fill: true,
            borderColor: "#337bff",
            tension: 0.1,
        },
    ]
};

// Criando estrutura para plotar gráfico - config
const configCPUVelocidadeLine = {
    type: "line",
    data: dadosCPUVelocidadeLine,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartCPUVelocidadeLine = new Chart(
    document.getElementById("cpu-grafico-velocidade-line"),
    configCPUVelocidadeLine
);


//Gráfico KPI
// Gráfico CPU Utilização - Linha
let labelsCpuKpi = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23", "14:25", "14:27", "14:29"];

// Criando estrutura para plotar gráfico - dados
let dadosCpuKpi = {
    labels: labelsCpuKpi,
    datasets: [
        {
            label: "Outras máquinas",
            data: [34, 32, 35, 37, 34, 33, 34, 35, 38, 33, 32, 31, 33],
            fill: false,
            borderColor: "#337bff",
            tension: 0.1,
        },
        {
            label: "Máquina 01",
            data: [36, 39, 43, 40.2, 44, 43, 44, 45, 48, 49, 43, 45, 42],
            fill: false,
            borderColor: "#EF2C2C",
            tension: 0.1,
        }
    ]
};

// Criando estrutura para plotar gráfico - config
const configCpuKpi = {
    type: "line",
    data: dadosCpuKpi,

};

// Adicionando gráfico criado em div na tela
let myChartCpuKpi = new Chart(
    document.getElementById("cpu-grafico-kpi"),
    configCpuKpi
);