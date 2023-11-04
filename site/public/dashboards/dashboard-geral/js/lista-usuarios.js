const listaUsuarios = document.querySelector('#lista-usuarios')

fetch(`${window.location.origin}/usuarios/listarUsuariosPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: "no-cache" }).then(res => {
    res.json().then(json => {
        json.forEach(usuario => {
            console.log(usuario);
            listaUsuarios.innerHTML += `
                <div class="box-user">
                    <div class="infos-user">
                        <div class="icon-user">
                            <img src="../../assets/imgs/user-icon-black.png" alt="">
                            <h1 id="nome-user-1">${usuario.nome}</h1>
                        </div>

                        <div class="user-email-telefone">
                            <span id="email-user-1">${usuario.email}</span>
                            <div class="division"></div>
                            <span id="lan-house-user-1">${usuario.unidade}</span>
                        </div>
                    </div>
                    <div class="buttons-user">
                        <button id="editar">Editar</button>
                        <button idUsuario=${usuario.idUsuario} statusUsuario='${usuario.statusUsuario}' style='color: #fff;background-color: ${usuario.statusUsuario == 1 ? 'red' : 'green'}' class='ativar-desativar-usuario'> ${usuario.statusUsuario == 1 ? 'Desativar' : 'Ativar'}</button>
                    </div>
                </div>
            `
        })
    })
})

document.querySelector('#username').innerText = sessionStorage.getItem('nomeUsuario')

setTimeout(() => {
    document.querySelectorAll('.ativar-desativar-usuario').forEach(ativarDesativar => {
        ativarDesativar.addEventListener('click', desativarOuAtivarUsuario)
    })

    document.querySelectorAll('.visualizar-lanhouse').forEach(visualizarLanhouse => {
        visualizarLanhouse.addEventListener('click', e => {
            sessionStorage.setItem('destacar-lanhouse', e.target.getAttribute('idLanhouse'))
            window.location.href = window.location.origin + '/dashboards/dashboard-geral/lista-lanhouses.html'
        })
    })
}, 500)

const desativarOuAtivarUsuario = e => {
    fetch(`${window.location.origin}/usuarios/${e.target.getAttribute('statusUsuario') == 1 ? 'desativar' : 'ativar'}/${e.target.getAttribute('idUsuario')}`, { method: 'PUT' }).then(res => {
        if (res.ok) {
            window.location.reload()
        } else {
            console.log('Erro na desativação/ativação deste usuário')
        }
    })
}