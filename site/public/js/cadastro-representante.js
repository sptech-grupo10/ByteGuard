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

iCpf.addEventListener('input', () => {
    iCpf.value = iCpf.value.replace(/\D/g, "")
    iCpf.value = iCpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    iCpf.value = iCpf.value.replace(/(\d{3})(\d)/, "$1.$2")
    iCpf.value = iCpf.value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
})

document.querySelector('#btcadastrar').addEventListener('click', () => {
    cadastrarEndereco()
})

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
    if (!cep || !cidade || !uf || !bairro || !logradouro
        || !numero || !nome || !telefone || !email || !cpf) {
        return 'Preencha todos os campos'
    }

    if (!(email.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))) {
        return 'Insira um email válido'
    }

    if (!validarCPF(cpf)) return 'Insira um CPF válido'

    if (validarTelefone(telefone) != 'Válido') return validarTelefone(telefone)
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false
    if (cpf.length != 11 ||
        cpf == "00000000000" ||
        cpf == "11111111111" ||
        cpf == "22222222222" ||
        cpf == "33333333333" ||
        cpf == "44444444444" ||
        cpf == "55555555555" ||
        cpf == "66666666666" ||
        cpf == "77777777777" ||
        cpf == "88888888888" ||
        cpf == "99999999999")
        return false
    add = 0;
    for (i = 0; i < 9; i++)
        add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false
    add = 0;
    for (i = 0; i < 10; i++)
        add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11)
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false
    return true
}

function validarTelefone(telefone) {
    const dddsValidos = [
        11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99
    ]

    telefone = telefone.replace(/\D/g, '')

    if (telefone.length < 11) return 'Insira um telefone válido'

    if (parseInt(telefone.substring(2, 3)) != 9) return 'Insira um telefone válido'

    if (dddsValidos.indexOf(parseInt(telefone.substring(0, 2))) == -1) return 'Insira um ddd válido'

    return 'Válido'
}