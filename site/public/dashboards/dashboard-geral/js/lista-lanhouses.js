const listaLanhouses = document.querySelector('.lista-lanhouses')

fetch(`${window.location.origin}/lanhouses/listarLanhousesPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: 'no-store' }).then(res => {
    if (res.ok) {
        res.json().then(json => {
            json.forEach(lanhouse => {
                listaLanhouses.innerHTML += `<tr>
                    <td>${lanhouse.idLanHouse}</td>
                    <td>${lanhouse.unidade}</td>
                    <td>${lanhouse.cnpj}</td>
                    <td idRepresentante = ${lanhouse.idRepresentante} class="representante-open-modal">${lanhouse.nome}</td>
                    <td idEndereco = ${lanhouse.idEndereco} class="endereco-open-modal">${lanhouse.logradouro}, ${lanhouse.numero}</td>
                    <td><div class='status-indicador ${lanhouse.statusLanhouse == 1 ? 'status-ativo' : 'status-bloqueado'}'></div></td>
                    <td><span idLanhouse='${lanhouse.idLanHouse}' class='login-direto'>Fazer login</span></td>
                    <td><span statusLanhouse=${lanhouse.statusLanhouse} idLanhouse='${lanhouse.idLanHouse}' class='ativar-desativar-lanhouse'>${lanhouse.statusLanhouse == 1 ? 'Desativar' : 'Ativar'}</span></td>
                    <td><span idLanhouse=${lanhouse.idLanHouse} class="criar-usuario">Criar usuário</span></td>
                </tr>`
            })
        })
    } else {
        console.log('erro na listagem')
    }
})

setTimeout(() => {
    document.querySelectorAll('.ativar-desativar-lanhouse').forEach(lanhouse => {
        lanhouse.addEventListener('click', desativarOuAtivarLanhouse)
    })

    document.querySelector('#btCadastrarUsuario').addEventListener('click', cadastrarUsuarioLanhouse)

    $(document).ready(() => {
        $('.endereco-open-modal').on('click', (e) => {
            montarModalEndereco(e.target.getAttribute('idEndereco'))
            $('#modal-endereco-lanhouse').modal('show')
        })

        $('.representante-open-modal').on('click', (e) => {
            montarModalRepresentante(e.target.getAttribute('idRepresentante'))
            $('#modal-representante-lanhouse').modal('show')
        })

        $('.criar-usuario').on('click', (e) => {
            $('#btCadastrarUsuario').attr('idLanhouse', e.target.getAttribute('idLanhouse'))
            $('#modal-cadastrar-usuario-lanhouse').modal('show')
        })
    })
}, 200);

const cadastrarUsuarioLanhouse = e => {
    let modal = document.querySelector('#modal-cadastrar-usuario-lanhouse')
    let cookie = modal.querySelector('#error-cookie')
    cookie.innerText = ''
    let username = modal.querySelector('#iUsername').value
    let email = modal.querySelector('#iEmail').value
    let senha = modal.querySelector('#iSenha').value
    let confirmSenha = modal.querySelector('#iConfirmSenha').value
    let idLanhouse = e.target.getAttribute('idLanhouse')
    console.log(idLanhouse);

    if (username == '' || email == '' || senha == '' || confirmSenha == '') {
        cookie.innerText = 'Preencha todos os campos'
    } else if (username.length < 5) {
        cookie.innerText = 'Nome de usuário muito curto'
    } else if (senha != confirmSenha) {
        cookie.innerText = 'As senhas devem ser idênticas'
    } else if (validarSenha(senha) != 'Válida') {
        cookie.innerText = validarSenha(senha)
    } else {
        fetch(`${window.location.origin}/usuarios/cadastrar`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nomeServer: username,
                emailServer: email,
                senhaServer: senha,
                tipoUsuarioServer: 2,
                fkEmpresaServer: null,
                fkLanHouseServer: idLanhouse
            })
        })
    }
}

function validarSenha(senha) {
    if (senha.length < 8) {
        return 'Senha muito curta'
    } else if (!/[A-Z]/gm.test(senha)) {
        return 'A senha necessita de pelo menos uma letra maiúsculas'
    } else if (!/[0-9]/gm.test(senha)) {
        return 'A senha necessita de pelo menos um números'
    } else if (!/[[!@#$%*()_+^&{}}:;?.]/gm.test(senha)) {
        return 'A senha necessita de pelo menos um caractere especial'
    }
    return 'Válida'
}

const montarModalRepresentante = idRepresentante => {
    fetch(`${window.location.origin}/representantes/buscarRepresentantePorId/${idRepresentante}`, { cache: "no-cache" }).then(res => {
        if (res.ok) {
            let modalRepresentante = document.querySelector('#modal-representante-lanhouse')
            res.json().then(representante => {
                modalRepresentante.querySelector('#idRepresentanteModal').innerText = representante[0].idRepresentante
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