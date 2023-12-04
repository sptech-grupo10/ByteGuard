fetch(`${window.location.origin}/lanhouses/buscarLanHousePorId/${sessionStorage.getItem('idLanhouse')}`, { cache: "no-cache" }).then(res => {
    if (res.ok) {
        res.json().then(lanhouse => {
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
            document.querySelector('#lan-house-atual').innerText = lanhouse.unidade
        })
    } else {
        console.log('Erro na busca da lanhouse')
    }
})

document.querySelectorAll('#maquina-atual').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('nomeMaquina')
})

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
    maquinas = await res.json()

    document.querySelector('.status-maquinas').innerHTML = ''

    if (!maquinas[0]) return

    if (maquinas[0].componentessobrecarrecados > 0) {
        document.querySelector('#lista-maquinas').innerHTML += `
            <div class="header-maquinas">
                            <div class="alerta-kpi" id="maquinas-kpi-alerta">
                                <span>Neste momento, a máquina <span id="maquina-kpi">${maquinas[0].nomeMaquina}</span> requer mais atenção, esta máquina é a que possui mais componentes sobrecarregados. Total de componentes: <span id="componentes-kpi">${maquinas[0].componentessobrecarrecados}</span>.</span>
                            </div>
            </div>
        `
    }

    maquinas.forEach(maquina => {
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
            printLanhouse(lanhouse.unidade)
            document.querySelector('#insert-codigo-lanhouse').innerText = lanhouse.codigoAcesso
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