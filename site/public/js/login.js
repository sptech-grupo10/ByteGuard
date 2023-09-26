document.querySelector('#login').addEventListener('click', validarCampos)

function validarCampos() {
    const email = document.querySelector('#iEmail').value, senha = document.querySelector('#iSenha').value, cookie = document.querySelector('#cookie')
    cookie.innerText = ''

    if (email == '' || senha == '') {
        cookie.innerText = 'Preencha todos os campos'
    } else {
        fetch(`${window.location.origin}/usuarios/login/${email}/${senha}`, { cache: 'no-store' }).then(res => {
            if (res.ok) {
                if (res.status == 200) {
                    console.log('Login realizado');
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