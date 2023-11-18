document.querySelectorAll('.print-username').forEach(usernameClass => {
    usernameClass.innerText = sessionStorage.getItem('nomeUsuario')
})

document.querySelectorAll('.user-cargo').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('tipoUsuario') == 1 ? "admin" : "user"
})

document.querySelectorAll('#maquina-atual').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('nomeMaquina')
})

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

// Gráfico GPU Uso - Line
let labelsGpuUsoLinha = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18", "14:19"];

// Criando estrutura para plotar gráfico - dados
let dadosGpuUsoLinha = {
    labels: labelsGpuUsoLinha,
    datasets: [{
        label: "",
        data: [2, 3, 1, 4, 4, 3, 2, 0, 4, 3],
        backgroundColor: "#337bff",
        fill: true,
        borderColor: "#337bff",

    },]
};

// Criando estrutura para plotar gráfico - config
const configGpuUsoLinha = {
    type: "bar",
    data: dadosGpuUsoLinha,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartGpuUsoLinha = new Chart(
    document.getElementById("gpu-grafico-uso-linha"),
    configGpuUsoLinha
);

//--------------------------------------------------------------------------------
// Gráfico GPU Uso - Line
let labelsVelocidadeGpuLinha = ["14:10", "14:11", "14:12", "14:13", "14:14", "14:15", "14:16", "14:17", "14:18"];

// Criando estrutura para plotar gráfico - dados
let dadosVelocidadeGpuLinha = {
    labels: labelsVelocidadeGpuLinha,
    datasets: [{
        label: "",
        data: [47, 53, 54, 55, 65, 77, 38, 45, 90],
        fill: true,
        borderColor: "#337bff",
    },]
};

// Criando estrutura para plotar gráfico - config
const configVelocidadeGpuLinha = {
    type: "line",
    data: dadosVelocidadeGpuLinha,
    options: {
        plugins: {
            legend: {
                display: false,
            }
        }
    }
};

// Adicionando gráfico criado em div na tela
let myChartVelocidadeGpuLinha = new Chart(
    document.getElementById("gpu-grafico-velocidade"),
    configVelocidadeGpuLinha
);