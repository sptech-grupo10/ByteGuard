const cadastrarLanhouse = () => {
    fetch(`${window.location.origin}/lanhouses/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            unidadeServer: iUnidade.value,
            cnpjServer: iCnpj.value.replace(/[^\d]+/g, ''),
            fkEnderecoServer: sessionStorage.getItem('idEndereco'),
            fkEmpresaServer: sessionStorage.getItem('idEmpresa'),
            fkRepresentanteServer: sessionStorage.getItem('idRepresentante'),
            codigoAcessoServer: String(Date.now()).slice(8, 13)
        })
    }).then(res => {
        if (res.ok) {
            res.json().then(json => {
                if (!window.location.href.includes('dashboards')) {
                    sessionStorage.setItem('idLanhouse', json.insertId)
                    sessionStorage.setItem('tipoUsuario', 2)
                    window.location.href = `${window.location.origin}/cadastro-usuario.html`
                } else {
                    document.querySelector('.toast').innerText = 'Lanhouse cadastrada'
                    document.querySelector('.toast').style.right = '1rem'
                    setTimeout(() => {
                        document.querySelector('.toast').style.right = '-20%'
                    }, 1000);
                }
            })
        } else {
            console.log('Erro no cadastro de empresa')
        }
    }).catch(e => {
        console.log(e)
    })
}

document.querySelector('#btCadastrarLanhouse').addEventListener('click', () => {
    cadastrarEndereco(cadastrarRepresentante()).then(() => {
        setTimeout(() => {
            cadastrarLanhouse()
        }, 600)
    })
})