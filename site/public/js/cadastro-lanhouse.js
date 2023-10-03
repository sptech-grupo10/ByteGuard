const cadastrarLanhouse = () => {
    fetch(`${window.location.origin}/lanhouses/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            unidadeServer: iUnidade.value,
            cnpjServer: iCnpj.value,
            fkEnderecoServer: sessionStorage.getItem('idEndereco'),
            fkEmpresaServer: sessionStorage.getItem('idEmpresa'),
            fkRepresentanteServer: sessionStorage.getItem('idRepresentante')
        })
    }).then(res => {
        if (res.ok) {
            res.json().then(json => {
                sessionStorage.setItem('idLanhouse', json.insertId)
                sessionStorage.setItem('tipoUsuario', 2)
                window.location.href = `${window.location.origin}/cadastro-usuario.html`
            })
        } else {
            console.log('Erro no cadastro de empresa')
        }
    }).catch(e => {
        console.log(e)
    })
}

document.querySelector('#btCadastrar').addEventListener('click', () => {
    cadastrarEndereco(cadastrarRepresentante()).then(() => {
        setTimeout(() => {
            cadastrarLanhouse()
        }, 600)
    })
})