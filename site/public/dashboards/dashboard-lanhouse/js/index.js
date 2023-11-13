listarMaquinas()

async function listarMaquinas() {
    res = await fetch(`/maquinas/buscarMaquinasPorLanHouse/${sessionStorage.getItem('idLanhouse')}`)
    maquina = await res.json()

    maquina.forEach(maquina => {
        document.querySelector('.status-maquinas').innerHTML += `
        <div class="box-maquina">
            <div class="status-icon-nome">
                <div class="cor-legend circle-critico"></div>
                <img src="../../assets/imgs/pc-icon-black.png" alt="">
                <h1>${maquina.nomeMaquina}</h1>
            </div>

            <div class="botao-acessar">
                <button onclick="acessarDashboardMaquina()">Visualizar</button>
            </div>
        </div>
        `
    })
}

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