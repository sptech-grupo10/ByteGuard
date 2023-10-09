const listaUsuarios = document.querySelector('.lista-usuarios')

fetch(`${window.location.origin}/usuarios/listarUsuariosPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: "no-cache" }).then(res => {
    res.json().then(json => {
        json.forEach(usuario => {
            listaUsuarios.innerHTML += `<tr>
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.senha}</td>
                <td><div class='status-indicador ${usuario.statusUsuario == 1 ? 'status-ativo' : 'status-bloqueado'}'></div></td>
                <td><span class="visualizar-lanhouse" idLanhouse="${usuario.idLanHouse}">${usuario.idLanHouse} - ${usuario.unidade}</span></td>
                <td><span statusUsuario="${usuario.statusUsuario}" idUsuario="${usuario.idUsuario}" class="ativar-desativar-usuario">${usuario.statusUsuario == 1 ? 'Desativar' : 'Ativar'}</span></td>
            </tr>`
        })
    })
})

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