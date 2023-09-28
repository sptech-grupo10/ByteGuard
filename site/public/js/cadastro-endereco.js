const cadastrarEndereco = (callback) => {
    let validador = validarEndereco(iCep.value, iCidade.value, iUf.value,
        iBairro.value, iLogradouro.value, iNumero.value)

    if (validador != 'Válido') {
        cookie.innerText = validador
        return
    }

    fetch(`${window.location.origin}/enderecos/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cepServer: iCep.value,
            cidadeServer: iCidade.value,
            ufServer: iUf.value,
            bairroServer: iBairro.value,
            logradouroServer: iLogradouro.value,
            numeroServer: iNumero.value
        })
    }).then(res => {
        if (res.ok) {
            res.json().then(json => {
                sessionStorage.setItem('idEndereco', json.insertId)
                callback()
            })
        } else {
            console.log('Erro no cadastro de endereço')
        }
    }).catch(e => {
        console.log(`Erro: ${e}`)
    })
}

function validarEndereco(cep, cidade, uf, bairro, logradouro, numero) {
    if (!cep || !cidade || !uf || !bairro || !logradouro || !numero)
        return 'Preencha todos os campos'

    return 'Válido'
}