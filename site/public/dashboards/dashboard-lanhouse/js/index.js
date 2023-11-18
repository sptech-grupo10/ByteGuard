listarMaquinas()
setInterval(async () => {
    await listarMaquinas()
    document.querySelectorAll('#visualizar-maquina').forEach(visualizar => {
        visualizar.addEventListener('click', e => {
            sessionStorage.setItem('idMaquina', e.target.getAttribute('idMaquina'))
            sessionStorage.setItem('nomeMaquina', e.target.getAttribute('nomeMaquina'))
            window.location.href = `${window.location.origin}/dashboards/dashboard-lanhouse/dashboard-componentes.html`
        })
    })
}, 2000);


async function listarMaquinas() {
    res = await fetch(`/maquinas/buscarMaquinasComponentesForaIdeal/${sessionStorage.getItem('idLanhouse')}`)
    maquina = await res.json()
    console.log(maquina)

    document.querySelector('.status-maquinas').innerHTML = ''
    maquina.forEach(maquina => {
        let status
        if (maquina.componentessobrecarrecados > 1) {
            status = 'critico'
        } else if (maquina.componentessobrecarrecados == 1) {
            status = 'atencao'
        } else {
            status = 'ideal'
        }

        document.querySelector('.status-maquinas').innerHTML += `
        <div class="box-maquina">
            <div class="status-icon-nome">
                <div class="cor-legend circle-${status}"></div>
                <img src="../../assets/imgs/pc-icon-black.png" alt="">
                <h1>${maquina.nomeMaquina}</h1>
                <span>Componentes sobrecarregados: ${maquina.componentessobrecarrecados}</span>
            </div>

            <div class="botao-acessar">
                <button nomeMaquina = '${maquina.nomeMaquina}' idMaquina='${maquina.idMaquina}' id="visualizar-maquina">Visualizar</button>
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