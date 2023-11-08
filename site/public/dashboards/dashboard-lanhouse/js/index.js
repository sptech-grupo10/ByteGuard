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