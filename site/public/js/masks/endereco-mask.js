const iCep = document.querySelector('#iCep'),
    iCidade = document.querySelector('#iCidade'),
    iUf = document.querySelector('#iUf'),
    iBairro = document.querySelector('#iBairro'),
    iLogradouro = document.querySelector('#iLogradouro'),
    iNumero = document.querySelector('#iNumero'),
    cookie = document.querySelector('#error-cookie')

function resetarCampos() {
    cookie.innerText = ''
    iCidade.value = ''
    iUf.value = ''
    iBairro.value = ''
    iLogradouro.value = ''
    iCep.style.color = 'black';
}

document.querySelector('#btBuscarCep').addEventListener('click', buscarCep)

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

iCep.addEventListener('input', () => {
    iCep.value = iCep.value.replace(/\D/g, '')
    iCep.value = iCep.value.replace(/(\d{5})(\d)/, '$1-$2')
})