listarMaquinas()
setInterval(async () => {
    await listarMaquinas()
    document.querySelectorAll('#visualizar-maquina').forEach(visualizar => {
        visualizar.addEventListener('click', e => {
            sessionStorage.setItem('idMaquina', e.target.getAttribute('idMaquina'))
            window.location.href += 'dashboard-componentes.html'
        })
    })
}, 2000);


async function listarMaquinas() {
    res = await fetch(`/maquinas/buscarMaquinasComponentesForaIdeal/${sessionStorage.getItem('idLanhouse')}`)
    maquina = await res.json()

    document.querySelector('.status-maquinas').innerHTML = ''
    maquina.forEach(maquina => {
        let status = maquina.componentessobrecarrecados < 1 ? 'ideal' : 'atencao'
        document.querySelector('.status-maquinas').innerHTML += `
        <div class="box-maquina">
            <div class="status-icon-nome">
                <div class="cor-legend circle-${status}"></div>
                <img src="../../assets/imgs/pc-icon-black.png" alt="">
                <h1>${maquina.nomeMaquina}</h1>
                <span>Componentes sobrecarregados: ${maquina.componentessobrecarrecados}</span>
            </div>

            <div class="botao-acessar">
                <button idMaquina='${maquina.idMaquina}' id="visualizar-maquina">Visualizar</button>
            </div>
        </div>
        `
    })
}