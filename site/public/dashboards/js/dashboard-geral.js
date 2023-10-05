const listaLanhouses = document.querySelector('.lista-lanhouses')

fetch(`${window.location.origin}/lanhouses/listarLanhousesPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: 'no-store' }).then(res => {
    if (res.ok) {
        res.json().then(json => {
            json.forEach(lanhouse => {
                listaLanhouses.innerHTML += `<tr>
                    <td>${lanhouse.idLanHouse}</td>
                    <td>${lanhouse.unidade}</td>
                    <td>${lanhouse.cnpj}</td>
                    <td>${lanhouse.nome}</td>
                    <td>${lanhouse.email}</td>
                    <td>${lanhouse.logradouro}, ${lanhouse.numero}</td>
                    <td><div class='status-indicador ${lanhouse.statusLanhouse == 1 ? 'status-ativo' : 'status-bloqueado'}'></div></td>
                    <td><span idLanhouse='${lanhouse.idLanHouse}' class='login-direto'>Fazer login</span></td>
                    <td><span statusLanhouse=${lanhouse.statusLanhouse} idLanhouse='${lanhouse.idLanHouse}' class='ativar-desativar-lanhouse'>${lanhouse.statusLanhouse == 1 ? 'Desativar' : 'Ativar'}</span></td>
                </tr>`
            })
        })
    } else {
        console.log('erro na listagem')
    }
})

setTimeout(() => {
    document.querySelectorAll('.ativar-desativar-lanhouse').forEach(lanhouse => {
        lanhouse.addEventListener('click', desativarOuAtivarLanhouse);
    })
}, 200);

const desativarOuAtivarLanhouse = e => {
    fetch(`${window.location.origin}/lanhouses/${e.target.getAttribute('statusLanhouse') == 1 ? 'desativar' : 'ativar'}/${e.target.getAttribute('idLanhouse')}`, {
        method: 'PUT'
    }).then(res => {
        if (res.ok) {
            window.location.reload()
        } else {
            console.log('Erro na desativação')
        }
    }).catch(e => {
        console.log(e)
    })
}

document.querySelector('#logout').addEventListener('click', () => {
    window.location.href = `${window.location.origin}/login.html`
})