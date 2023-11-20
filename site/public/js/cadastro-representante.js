const cadastrarRepresentante = async (callback) => {
    let validador = validarRepresentante(iNome.value, iTelefone.value, iEmail.value, iCpf.value)
    if (validador != 'Válido') {
        cookie.innerText = validador
        return
    }

    fetch(`${window.location.origin}/representantes/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            nomeServer: iNome.value,
            telefoneServer: iTelefone.value,
            emailServer: iEmail.value,
            cpfServer: iCpf.value
        })
    }).then(res => {
        if (res.ok) {
            res.json().then(json => {
                console.log(json)
                sessionStorage.setItem('idRepresentante', json.insertId)
                callback()
            })
        } else {
            console.log('Erro no cadastro de representante')
        }
    }).catch(e => {
        console.log(`Erro: ${e}`)
    })
}

function validarRepresentante(nome, telefone, email, cpf) {
    const spanErroNome = document.getElementById("error-nome")
    const spanErroTelefone = document.getElementById("error-telefone")
    const spanErroCpf = document.getElementById("error-cpf")
    const spanErroEmail = document.getElementById("error-email")

    spanErroNome.innerHTML = ""
    spanErroTelefone.innerHTML = ""
    spanErroCpf.innerHTML = ""
    spanErroEmail.innerHTML = ""

    var mensagemErro = "Campo obrigatório"

    if (!nome && !telefone && !email && !cpf) {
        spanErroNome.innerHTML = mensagemErro
        spanErroTelefone.innerHTML = mensagemErro
        spanErroCpf.innerHTML = mensagemErro
        spanErroEmail.innerHTML = mensagemErro
        return 'Preencha todos os campos'
    }

    if (nome == "") {
        spanErroNome.innerHTML = mensagemErro
        return "Preencha este campo"
    }

    if (telefone == "") {
        spanErroTelefone.innerHTML = mensagemErro
        return "Preencha este campo"
    }

    if (email == "") {
        spanErroEmail.innerHTML = mensagemErro
        return "Preencha este campo"
    }

    if (cpf == "") {
        spanErroCpf.innerHTML = mensagemErro
        return "Preencha este campo"
    }

    if (!(email.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ))) {
        spanErroEmail.innerHTML = mensagemErro
        return 'Insira um email válido'
    }

    if (!validarCPF(cpf)) {
        spanErroCpf.innerHTML = "CPF inválido"
        return 'Insira um CPF válido'
    }

    if (validarTelefone(telefone) != 'Válido') {
        spanErroTelefone.innerHTML = "Telefone inválido"
        return validarTelefone(telefone)
    }

    return 'Válido'
}

function validarCPF(cpf) {
    const spanErroCpf = document.getElementById("error-cpf")
    var mensagemErro = "CPF inválido"

    spanErroCpf.innerHTML = ""

    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') {
        spanErroCpf.innerHTML = mensagemErro
        return false
    }

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
        cpf == "99999999999") {
        spanErroCpf.innerHTML = mensagemErro
        return false
    }

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
    if (rev != parseInt(cpf.charAt(10))) {
        spanErroCpf.innerHTML = mensagemErro
        return false
    }
    return true
}

function validarTelefone(telefone) {
    const spanErroTelefone = document.getElementById("error-telefone")
    var mensagemErro = "Telefone inválido"

    spanErroTelefone.innerHTML = ""

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

    if (telefone.length < 11) {
        spanErroTelefone.innerHTML = mensagemErro
        return 'Insira um telefone válido'
    }

    if (parseInt(telefone.substring(2, 3)) != 9) {
        spanErroTelefone.innerHTML = mensagemErro
        return 'Insira um telefone válido'
    }

    if (dddsValidos.indexOf(parseInt(telefone.substring(0, 2))) == -1) {
        spanErroTelefone.innerHTML = mensagemErro
        return 'Insira um ddd válido'
    }

    return 'Válido'
}