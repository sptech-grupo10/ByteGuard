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

const printLanhouse = lanhouse => {
    document.querySelectorAll('.print-lanhouse').forEach(usernameClass => {
        usernameClass.innerText = lanhouse
    })
}

function exibirDivAlertas() {
    var displayDivAlertas = document.getElementById("alertas");
    if (displayDivAlertas.style.display != "flex") {
        displayDivAlertas.style.display = "flex";
    } else {
        displayDivAlertas.style.display = "none";
    }
}


var qtdAlertasExibidos = [];

function plotarAlertas() {
    var notificacao = `<div class="notificacao critico">`;
    notificacao += `<div class="alerta-icon-componente">
                    <h3 id="title-componente">Rede</h3>
                    <span class="icon-alerta" id="cor-alerta-critico">!</span>
                </div>

                <span id="classificacao-alerta">Crítico</span>
                <span id="mensagem-alerta">A máquina 10 teve 1 oscilação de internet e ficou 0.2s offline.</span>
                </div>
                `;
    document.getElementById("alertas").innerHTML += notificacao;
    qtdAlertasExibidos.push(notificacao);
    console.log(qtdAlertasExibidos);
    console.log(qtdAlertasExibidos.length);
}

function exibirPopUpAlertas() {
    var divPopUpNotificacao = document.getElementById("total-alertas");

    if (qtdAlertasExibidos.length > 0) {
        divPopUpNotificacao.style.display = "flex";
        // divPopUpNotificacao.innerHTML = qtdAlertasExibidos.length;
    } else {
        divPopUpNotificacao.style.display = "none";
    }
}