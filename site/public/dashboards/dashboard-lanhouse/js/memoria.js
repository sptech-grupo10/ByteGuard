fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('RAM')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#ram-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#ram-value-espec-${i}`).innerText = espec.valorEspecificacao
    })
}))

// Gráfico Memória Uso
// Gráfico Memória Uso - Donut
let labelsMemoriaUsoDonut = ["Utilizado (%)", "Não utilizado (%)"];

// Criando estrutura para plotar gráfico - dados
let dadosMemoriaUsoDonut = {
    labels: labelsMemoriaUsoDonut,
    datasets: [{
        label: "",
        data: [47, 53],
        backgroundColor: ["#337bff", "#D9D9D9"]
    },]
};

// Criando estrutura para plotar gráfico - config
const configMemoriaUsoDonut = {
    type: "doughnut",
    data: dadosMemoriaUsoDonut,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartMemoriaUsoDonut = new Chart(
    document.getElementById("memoria-grafico-uso-donut"),
    configMemoriaUsoDonut
);


// Gráfico Memoria Utilização - Linha
let labelsMemoriaUsoLine = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21",
    "14:23", "14:25", "14:27", "14:29"
];

// Criando estrutura para plotar gráfico - dados
let dadosMemoriaUsoLine = {
    labels: labelsMemoriaUsoLine,
    datasets: [{
        label: "Uso da memória",
        data: [5.6, 5.6, 5.7, 5.6, 5.4, 5.5, 5.6, 5.6, 5.8, 5.6, 5.6, 5.7, 5.6],
        fill: true,
        borderColor: "#337bff",
        tension: 0.1,
    },]
};

// Criando estrutura para plotar gráfico - config
const configMemoriaUsoLine = {
    type: "line",
    data: dadosMemoriaUsoLine,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartMemoriaUsoLine = new Chart(
    document.getElementById("memoria-grafico-uso-line"),
    configMemoriaUsoLine
);

// Gráfico Memória Temporária - Linha
let labelsMemoriaTemporariaLine = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21",
    "14:23", "14:25", "14:27", "14:29"
];

// Criando estrutura para plotar gráfico - dados
let dadosMemoriaTemporariaLine = {
    labels: labelsMemoriaTemporariaLine,
    datasets: [{
        label: "Temporaria da memória",
        data: [5.6, 5.6, 5.7, 5.6, 5.4, 5.5, 5.6, 5.6, 5.8, 5.6, 5.6, 5.7, 5.6],
        fill: true,
        borderColor: "#337bff",
        backgroundColor: "#337bff",
        tension: 0.1,
    },]
};

// Criando estrutura para plotar gráfico - config
const configMemoriaTemporariaLine = {
    type: "bar",
    data: dadosMemoriaTemporariaLine,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartMemoriaTemporariaLine = new Chart(
    document.getElementById("memoria-grafico-temporaria"),
    configMemoriaTemporariaLine
);

// Gráfico Memória KPI - Linha
let labelsMemoriaKpiLine = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21",
    "14:23", "14:25", "14:27", "14:29"
];

// Criando estrutura para plotar gráfico - dados
let dadosMemoriaKpiLine = {
    labels: labelsMemoriaKpiLine,
    datasets: [{
        label: "Outras máquinas",
        data: [5.6, 5.6, 5.7, 5.6, 5.4, 5.5, 5.6, 5.6, 5.8, 5.6, 5.6, 5.7, 5.6],
        fill: true,
        borderColor: "#337bff",
        tension: 0.1,
    },
    {
        label: "Máquina 01",
        data: [5.8, 5.6, 5.5, 5.6, 5.41, 5.57, 5.6, 5.68, 5.7, 5.7, 5.61, 5.6, 5.7],
        fill: true,
        borderColor: "#EF2C2C",
        tension: 0.1,
    },
    ]
};

// Criando estrutura para plotar gráfico - config
const configMemoriaKpiLine = {
    type: "line",
    data: dadosMemoriaKpiLine,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartMemoriaKpiLine = new Chart(
    document.getElementById("memoria-grafico-kpi"),
    configMemoriaKpiLine
);