const listaLanhouses = document.querySelector('.lista-lanhouses')

fetch(`${window.location.origin}/lanhouses/listarLanhousesPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: 'no-store' }).then(res => {
    if (res.ok) {
        res.json().then(json => {
            json.forEach(lanhouse => {
                listaLanhouses.innerHTML += `<tr>
                    <td>${lanhouse.idLanHouse}</td>
                    <td>${lanhouse.unidade}</td>
                    <td>${lanhouse.cnpj}</td>
                    <td idRepresentante = ${lanhouse.idRepresentante} id="representante-open-modal">${lanhouse.nome}</td>
                    <td idEndereco = ${lanhouse.idEndereco} id="endereco-open-modal">${lanhouse.logradouro}, ${lanhouse.numero}</td>
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

    $(document).ready(() => {
        $('#endereco-open-modal').on('click', (e) => {
            montarModalEndereco(e.target.getAttribute('idEndereco'))
            $('#modal-endereco-lanhouse').modal('show')
        })

        $('#representante-open-modal').on('click', (e) => {
            montarModalRepresentante(e.target.getAttribute('idRepresentante'))
            $('#modal-representante-lanhouse').modal('show')
        })
    })
}, 200);

const montarModalRepresentante = idRepresentante => {
    fetch(`${window.location.origin}/representantes/buscarRepresentantePorId/${idRepresentante}`, { cache: "no-cache" }).then(res => {
        if (res.ok) {
            let modalRepresentante = document.querySelector('#modal-representante-lanhouse')
            res.json().then(representante => {
                modalRepresentante.querySelector('#nomeModal').innerText = representante[0].nome
                modalRepresentante.querySelector('#telefoneModal').innerText = representante[0].telefone
                modalRepresentante.querySelector('#emailModal').innerText = representante[0].email
                modalRepresentante.querySelector('#cpfModal').innerText = representante[0].cpf
            })
        } else {
            console.log('Erro na busca de representante desta lanhouse')
        }
    })
}

const montarModalEndereco = idEndereco => {
    fetch(`${window.location.origin}/enderecos/buscarEnderecoPorId/${idEndereco}`, { cache: "no-cache" }).then(res => {
        if (res.ok) {
            let modalEndereco = document.querySelector('#modal-endereco-lanhouse')
            res.json().then(endereco => {
                modalEndereco.querySelector('#idEnderecoModal').innerText = endereco[0].idEndereco
                modalEndereco.querySelector('#cepModal').innerText = endereco[0].cep
                modalEndereco.querySelector('#ufModal').innerText = endereco[0].uf
                modalEndereco.querySelector('#cidadeModal').innerText = endereco[0].cidade
                modalEndereco.querySelector('#bairroModal').innerText = endereco[0].bairro
                modalEndereco.querySelector('#logradouroModal').innerText = endereco[0].logradouro
                modalEndereco.querySelector('#numeroModal').innerText = endereco[0].numero
            })
        } else {
            console.log('Erro na busca de endereco desta lanhouse')
        }
    })
}

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