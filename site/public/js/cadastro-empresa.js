const iCep = document.querySelector('#iCep'),
    iCidade = document.querySelector('#iCidade'),
    iUf = document.querySelector('#iUf'),
    iBairro = document.querySelector('#iBairro'),
    iLogradouro = document.querySelector('#iLogradouro'),
    iNumero = document.querySelector('#iNumero'),
    iCnpj = document.querySelector('#iCnpj'),
    iNomeFantasia = document.querySelector('#iNomeFantasia'),
    iRazaoSocial = document.querySelector('#iRazaoSocial'),
    cookie = document.querySelector('#error-cookie')

iCep.addEventListener('input', () => {
    iCep.value = iCep.value.replace(/\D/g, '')
    iCep.value = iCep.value.replace(/(\d{5})(\d)/, '$1-$2')
})

document.querySelector('#btCadastrar').addEventListener('click', cadastrarEndereco)

document.querySelector('#btBuscarCep').addEventListener('click', buscarCep)

function resetarCampos() {
    cookie.innerText = ''
    iCidade.value = ''
    iUf.value = ''
    iBairro.value = ''
    iLogradouro.value = ''
    iCep.style.color = 'black';
}

function buscarCep() {
    resetarCampos()
    fetch(`https://viacep.com.br/ws/${document.querySelector('#iCep').value}/json/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            res.json().then(json => {
                if (!json.erro) {
                    iCidade.value = json.localidade
                    iUf.value = json.uf
                    iBairro.value = json.bairro
                    iLogradouro.value = json.logradouro
                } else {
                    iCep.style.color = 'red';
                }
            })
        })
}

function cadastrarEndereco() {
    let erro = validarCampos(iCep.value, iCidade.value, iUf.value,
        iBairro.value, iLogradouro.value, iNumero.value,
        iCnpj.value, iNomeFantasia.value, iRazaoSocial.value)

    if (erro) {
        cookie.innerText = erro
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
                cadastrarEmpresa(json.insertId)
            })
        } else {
            console.log('Erro no cadastro de endereço')
        }
    }).catch(e => {
        console.log(`Erro: ${e}`)
    })
}

function cadastrarEmpresa(fkEndereco) {
    fetch(`${window.location.origin}/empresas/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cnpjServer: iCnpj.value,
            nomeFantasiaServer: iNomeFantasia.value,
            razaoSocialServer: iRazaoSocial.value,
            fkEnderecoServer: fkEndereco,
            fkRepresentanteServer: sessionStorage.getItem('idRepresentante')
        })
    }).then(res => {
        res.json().then(json => {
            sessionStorage.setItem('idEmpresa', json.insertId)
        })
    })
}

function validarCampos(cep, cidade, uf, bairro, logradouro, numero, cnpj, nomeFantasia, razaoSocial) {
    if (!cep || !cidade || !uf || !bairro || !logradouro
        || !numero || !cnpj || !nomeFantasia || !razaoSocial) {
        return 'Preencha todos os campos'
    }
    return 'Válido'
}