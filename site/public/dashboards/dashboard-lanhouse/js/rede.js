fetch(`${window.location.origin}/especificacoes/buscarEspecificacaoComponente/${sessionStorage.getItem('Rede')}`).then(res => res.json().then(especs => {
    especs.forEach((espec, i) => {
        document.querySelector(`#rede-title-espec-${i}`).innerText = espec.especificacao
        document.querySelector(`#rede-value-espec-${i}`).innerText = espec.valorEspecificacao
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

// Gráfico Rede Uso - Line
let labelsRedeUsoLinha = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18", "14:19"];

// Criando estrutura para plotar gráfico - dados
let dadosRedeUsoLinha = {
    labels: labelsRedeUsoLinha,
    datasets: [{
        label: "",
        data: [47, 53, 66, 78, 99, 99, 99, 88, 76, 65],
        fill: true,
        borderColor: "#337bff",

    },]
};

// Criando estrutura para plotar gráfico - config
const configRedeUsoLinha = {
    type: "line",
    data: dadosRedeUsoLinha,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartRedeUsoLinha = new Chart(
    document.getElementById("rede-grafico-uso-linha"),
    configRedeUsoLinha
);

//--------------------------------------------------------------------------------
// Gráfico Rede Uso - Line
let labelsVelocidadeRedeLinha = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18"];

// Criando estrutura para plotar gráfico - dados
let dadosVelocidadeRedeLinha = {
    labels: labelsVelocidadeRedeLinha,
    datasets: [{
        label: "",
        data: [47, 53, 54, 55, 65, 77, 38, 45, 90],
        fill: true,
        borderColor: "#337bff",
    },]
};

// Criando estrutura para plotar gráfico - config
const configVelocidadeRedeLinha = {
    type: "line",
    data: dadosVelocidadeRedeLinha,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartVelocidadeRedeLinha = new Chart(
    document.getElementById("rederede-grafico-velocidade"),
    configVelocidadeRedeLinha
);
//--------------------------------------------------------------------------------
// Gráfico KPI - Barra
let labelsBarraKpi = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18"];

// Criando estrutura para plotar gráfico - dados
let dadosBarraKpi = {
    labels: labelsBarraKpi,
    datasets: [{
        label: "",
        data: [157, 160, 150, 0, 170, 165, 0, 180, 0],
        backgroundColor: ["#337bff"]
    },]
};

// Criando estrutura para plotar gráfico - config
const configBarraKpi = {
    type: "bar",
    data: dadosBarraKpi,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartBarraKpi = new Chart(
    document.getElementById("rederede-grafico-kpis"),
    configBarraKpi
);