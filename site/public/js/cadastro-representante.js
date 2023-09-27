const iCep = document.querySelector('#iCep'),
    iCidade = document.querySelector('#iCidade'),
    iUf = document.querySelector('#iUf'),
    iBairro = document.querySelector('#iBairro'),
    iLogradouro = document.querySelector('#iLogradouro'),
    iNumero = document.querySelector('#iNumero'),
    iNome = document.querySelector('#iNome'),
    iTelefone = document.querySelector('#iTelefone'),
    iEmail = document.querySelector('#iEmail'),
    iCpf = document.querySelector('#iCpf'),
    cookie = document.querySelector('#error-cookie')

iCep.addEventListener('input', () => {
    iCep.value = iCep.value.replace(/\D/g, '')
    iCep.value = iCep.value.replace(/(\d{5})(\d)/, '$1-$2')
})

iTelefone.addEventListener('input', () => {
    iTelefone.value = iTelefone.value.replace(/\D/g, '')
    iTelefone.value = iTelefone.value.replace(/(\d{2})(\d)/, "($1) $2")
    iTelefone.value = iTelefone.value.replace(/(\d)(\d{4})$/, "$1-$2")
})

document.querySelector('#btcadastrar').addEventListener('click', () => {
    cadastrarEndereco()
})

document.querySelector('#btBuscarCep').addEventListener('click', buscarCep)

function resetarCamposCep() {
    iCidade.value = ''
    iUf.value = ''
    iBairro.value = ''
    iLogradouro.value = ''
    iCep.style.color = 'black';
}

function buscarCep() {
    resetarCamposCep()
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
        iNome.value, iTelefone.value, iEmail.value, iCpf.value)

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
                cadastrarRepresentante(json.insertId)
            })
        } else {
            console.log('Erro no cadastro de endereço')
        }
    }).catch(e => {
        console.log(`Erro: ${e}`)
    })
}

function cadastrarRepresentante(fkEndereco) {
    fetch(`${window.location.origin}/representantes/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeServer: iNome.value,
            telefoneServer: iTelefone.value,
            emailServer: iEmail.value,
            cpfServer: iCpf.value,
            fkEnderecoServer: fkEndereco
        })
    }).then(res => {
        if (res.ok) {
            console.log(res)
        } else {
            console.log('Erro no cadastro de representante')
        }
    }).catch(e => {
        console.log(`Erro: ${e}`)
    })
}

function validarCampos(cep, cidade, uf, bairro, logradouro, numero, nome, telefone, email, cpf) {

}