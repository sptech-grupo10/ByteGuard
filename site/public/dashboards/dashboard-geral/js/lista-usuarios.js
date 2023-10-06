const listaUsuarios = document.querySelector('.lista-usuarios')

fetch(`${window.location.origin}/usuarios/listarUsuariosPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: "no-cache" }).then(res => {
    res.json().then(json => {
        json.forEach(usuario => {
            listaUsuarios.innerHTML += `<tr>
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.senha}</td>
                <td>${usuario.status}</td>
                <td>${usuario.idLanHouse} - ${usuario.unidade}</td>
                <td class="ativar-desativar-usuario">${usuario.status == 1 ? 'Desativar' : 'Ativar'}</td>
            </tr>`
        });
    })
})

setTimeout(() => {
    document.querySelectorAll('.ativar-desativar-usuario').forEach(ativarDesativar => {
        ativarDesativar.addEventListener('click', desativarOuAtivarUsuario)
    })
}, 200);

const desativarOuAtivarUsuario = e => {
    
}