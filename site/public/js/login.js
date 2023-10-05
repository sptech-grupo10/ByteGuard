if (!window.location.href.includes('dashboards')) {
    document.querySelector('#login').addEventListener('click', validarCampos)
    sessionStorage.clear()
} else {
    setTimeout(() => {
        document.querySelectorAll('.login-direto').forEach(btLoginDireto => {
            btLoginDireto.addEventListener('click', loginDireto)
        })
    }, 100);
}

const loginDireto = e => {
    sessionStorage.setItem('idLanhouse', e.target.getAttribute('idLanhouse'))
    window.location.href = `${window.location.origin}/dashboards/dashboard-lanhouse`
}

const fazerLogin = (login) => {
    sessionStorage.setItem('idUsuario', login.idUsuario)
    sessionStorage.setItem('nomeUsuario', login.nome)
    login.fkTipoUsuario == 1
        ? sessionStorage.setItem('idEmpresa', login.fkEmpresa)
        : sessionStorage.setItem('idLanhouse', login.fkLanhouse)

    setTimeout(() => {
        window.location.href = login.fkTipoUsuario == 1
            ? `${window.location.origin}/dashboards/dashboard-geral`
            : `${window.location.origin}/dashboards/dashboard-lanhouse`
    }, 500);
}

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
                        if (json[0].status == 1) {
                            fazerLogin(json[0])
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