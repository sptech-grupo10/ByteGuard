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

// Gráfico Disco tempo de atividade - Donut
let labelsTempoAtividadeDonut = ["Tempo em atividade (%)", "Tempo em ociosidade (%)"];

// Criando estrutura para plotar gráfico - dados
let dadosTempoAtividadeDonut = {
    labels: labelsTempoAtividadeDonut,
    datasets: [
        {
            label: "",
            data: [8, 92],
            backgroundColor: ["#337bff", "#D9D9D9"]
        },
    ]
};

// Criando estrutura para plotar gráfico - config
const configTempoAtividadeDonut = {
    type: "doughnut",
    data: dadosTempoAtividadeDonut,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartTempoAtividadeDonut = new Chart(
    document.getElementById("disco-grafico-tempo-atividade-donut"),
    configTempoAtividadeDonut
);

// Gráfico Disco tempo de atividade - Linha
let labelsTempoAtividadeLine = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23", "14:25", "14:27", "14:29"];

// Criando estrutura para plotar gráfico - dados
let dadosTempoAtividadeLine = {
    labels: labelsTempoAtividadeLine,
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
const configTempoAtividadeLine = {
    type: "line",
    data: dadosTempoAtividadeLine,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartTempoAtividadeLine = new Chart(
    document.getElementById("disco-grafico-tempo-atividade-line"),
    configTempoAtividadeLine
);

// Gráfico Disco tempo de atividade - Linha
let labelsDiscoKpi = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

// Gráfico Disco KPI - Linha
// Criando estrutura para plotar gráfico - dados
let dadosDiscoKpi = {
    labels: labelsDiscoKpi,
    datasets: [
        {
            label: "",
            data: [80, 80.2, 80.3, 80.7, 80.9, 81.0, 81.3, 81.5, 82.0, 89.0],
            fill: true,
            borderColor: "#337bff",
            backgroundColor: "#337bff",
            tension: 0.1,
        },
    ]
};

// Criando estrutura para plotar gráfico - config
const configDiscoKpi = {
    type: "bar",
    data: dadosDiscoKpi,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartDiscoKpi = new Chart(
    document.getElementById("disco-grafico-kpi"),
    configDiscoKpi
);

//Gráfico Leitura e Gravação
// Gráfico CPU Utilização - Linha
let labelsDiscoLeituraGravacao = ["14:05", "14:07", "14:09", "14:11", "14:13", "14:15", "14:17", "14:19", "14:21", "14:23", "14:25", "14:27", "14:29"];

// Criando estrutura para plotar gráfico - dados
let dadosDiscoLeituraGravacao = {
    labels: labelsDiscoLeituraGravacao,
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
};

// Criando estrutura para plotar gráfico - config
const configDiscoLeituraGravacao = {
    type: "line",
    data: dadosDiscoLeituraGravacao,
};

// Adicionando gráfico criado em div na tela
let myChartDiscoLeituraGravacao = new Chart(
    document.getElementById("disco-grafico-leitura-gravacao"),
    configDiscoLeituraGravacao
);
