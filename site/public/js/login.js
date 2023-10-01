document.querySelector('#login').addEventListener('click', validarCampos)

sessionStorage.clear()

function validarCampos() {
    const email = document.querySelector('#iEmail').value, senha = document.querySelector('#iSenha').value, cookie = document.querySelector('#cookie')
    cookie.innerText = ''

    if (email == '' || senha == '') {
        cookie.innerText = 'Preencha todos os campos'
    } else {
        fetch(`${window.location.origin}/usuarios/login/${email}/${senha}`, { cache: 'no-store' }).then(res => {
            if (res.ok) {
                if (res.status == 200) {
                    res.json().then(json => {
                        if(json[0].status == 1) {
                            sessionStorage.setItem('idUsuario', json[0].idUsuario)
                            sessionStorage.setItem('nomeUsuario', json[0].nome)
                            sessionStorage.setItem('idEmpresa', json[0].fkEmpresa)
                            setTimeout(() => {
                                window.location.href = json[0].fkTipoUsuario == 1 ? `${window.location.origin}/dashboards/dashboard-geral.html` : `${window.location.origin}/dashboards/dashboard-lanhouse.html`
                            }, 500);
                        } else {
                            cookie.innerText = 'Usuario bloqueado'
                        }
                    })
                } else {
                    cookie.innerText = 'Nenhum cadastro encontrado'
                }
            } else {
                console.log('Erro no login')
            }
        }).catch(e => {
            console.log(`Erro: ${e}`)
        })
    }
}