document.querySelectorAll('.print-username').forEach(usernameClass => {
    usernameClass.innerText = sessionStorage.getItem('nomeUsuario')
})

document.querySelectorAll('.user-cargo').forEach(userTypeClass => {
    userTypeClass.innerText = sessionStorage.getItem('tipoUsuario') == 1 ? "admin" : "user"
})

const listaLanhouses = document.querySelector('#lista-lan-houses')

async function listarLanhouses() {
    try {
        const listaRes = await fetch(`${window.location.origin}/lanhouses/listarLanhousesPorEmpresa/${sessionStorage.getItem('idEmpresa')}`, { cache: 'no-store' })
        const lista = await listaRes.json()

        lista.forEach(lanhouse => {
            listaLanhouses.innerHTML += `
                            <div class="tabela-lan-house mobile" id="tabela-lan-house">
                                <div class="title-lan-house">
                                    <h1 id="unidade">${lanhouse.unidade}</h1>
                                    <div class="cor-sinal ${lanhouse.statusLanhouse == 1 ? 'ideal' : 'inativo'}"></div>
                                </div>
    
                                <div class="infos-lan-house">
                                    <div class="box-info">
                                        <h3>Representante</h3>
                                        <span id="representante">${lanhouse.nome} <img idRepresentante=${lanhouse.idRepresentante} class='representante-open-modal' src="../../assets/imgs/info-icon-black.png" alt=""></span>
                                    </div>
                                    <div class="box-info">
                                        <h3>Telefone</h3>
                                        <span id="telefone">${lanhouse.telefone}</span>
                                    </div>
                                </div>
                                
                                <div class="infos-lan-house">
                                    <div class="box-info">
                                        <h3>Endereço</h3>
                                        <span  id="endereco">${lanhouse.logradouro}, ${lanhouse.numero} <img idEndereco='${lanhouse.idEndereco}' class='endereco-open-modal' src="../../assets/imgs/info-icon-black.png" alt=""></span>
    
                                    </div>
                                    <div class="box-info">
                                        <h3>CNPJ</h3>
                                        <span id="cnpj">${lanhouse.cnpj}</span>
                                    </div>
                                </div>
    
                            <div class="buttons">
                                <span  class='login-direto' idLanhouse='${lanhouse.idLanHouse}'>Acessar</span>
                                <span idLanhouse='${lanhouse.idLanHouse}' statuslanhouse='${lanhouse.statusLanhouse}' class='ativar-desativar-lanhouse'>${lanhouse.statusLanhouse == 1 ? 'Desativar' : 'Ativar'}</span>
                                <span class='criar-usuario'>Cadastrar novo usuário</span>
                            </div>
                        </div>
                    `
        })
    } catch (e) {
        console.log(e)
    }
}

listarLanhouses()

document.querySelector('#username').innerText = sessionStorage.getItem('nomeUsuario')

setTimeout(() => {
    document.querySelectorAll('.ativar-desativar-lanhouse').forEach(lanhouse => {
        lanhouse.addEventListener('click', desativarOuAtivarLanhouse)
    })

    document.querySelector('#btCadastrarUsuario').addEventListener('click', cadastrarUsuarioLanhouse)

    sessionStorage.getItem('destacar-lanhouse')
        ? destacarLanhouse(sessionStorage.getItem('destacar-lanhouse'))
        : ''

    function destacarLanhouse(idLanhouse) {
        document.querySelector(`.lanhouse-row.lanhouse-${idLanhouse}`).classList.add('destacar')
        sessionStorage.removeItem('destacar-lanhouse')
    }

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
}, 500);

const cadastrarUsuarioLanhouse = async e => {
    let modal = document.querySelector('#modal-cadastrar-usuario-lanhouse')
    let cookie = modal.querySelector('#error-cookie')
    cookie.innerText = ''
    let username = modal.querySelector('#iUsername').value
    let email = modal.querySelector('#iEmail').value
    let senha = modal.querySelector('#iSenha').value
    let confirmSenha = modal.querySelector('#iConfirmSenha').value
    let idLanhouse = e.target.getAttribute('idLanhouse')

    if (username == '' || email == '' || senha == '' || confirmSenha == '') {
        cookie.innerText = 'Preencha todos os campos'
    } else if (username.length < 5) {
        cookie.innerText = 'Nome de usuário muito curto'
    } else if (senha != confirmSenha) {
        cookie.innerText = 'As senhas devem ser idênticas'
    } else if (validarSenha(senha) != 'Válida') {
        cookie.innerText = validarSenha(senha)
    } else {
        try {
            await fetch(`${window.location.origin}/usuarios/cadastrar`, {
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
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
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