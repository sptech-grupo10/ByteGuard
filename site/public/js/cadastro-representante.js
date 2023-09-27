const iCep = document.querySelector('#iCep'), iCidade = document.querySelector('#iCidade'), iUf = document.querySelector('#iUf'), iBairro = document.querySelector('#iBairro'), iLogradouro = document.querySelector('#iLogradouro'), iNumero = document.querySelector('#iNumero')

iCep.addEventListener('input', () => {
    iCep.value = iCep.value.replace(/\D/g, '')
    iCep.value = iCep.value.replace(/(\d{5})(\d)/, '$1-$2')
})

document.querySelector('#btcadastrar').addEventListener('click', () => {
    cadastrarEndereco()
})

document.querySelector('#btBuscarCep').addEventListener('click', buscarCep)

function buscarCep() {
    iCep.style.color = 'black';
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
            console.log(res)
        } else {
            console.log('Erro no cadastro')
        }
    }).catch(e => {
        console.log(`Erro: ${e}`)
    })
}