sessionStorage.clear()

const cadastrarEmpresa = async () => {
    let validador = validarEmpresa(iCnpj.value, iNomeFantasia.value, iRazaoSocial.value)
    if (validador != 'Válido') {
        cookie.innerText = validador
        return
    }

    let divSuccess = document.getElementById("success")

    fetch(`${window.location.origin}/empresas/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cnpjServer: iCnpj.value.replace(/[^\d]+/g, ''),
            nomeFantasiaServer: iNomeFantasia.value,
            razaoSocialServer: iRazaoSocial.value,
            fkEnderecoServer: sessionStorage.getItem('idEndereco'),
            fkRepresentanteServer: sessionStorage.getItem('idRepresentante')
        })
    }).then(res => {
        if (res.ok) {
            res.json().then(json => {
                divSuccess.style.display = "flex"
                sessionStorage.setItem('idEmpresa', json.insertId)
                sessionStorage.setItem('tipoUsuario', 1)
                setTimeout(() => {
                    window.location.href = `${window.location.origin}/cadastro-usuario-empresa.html`
                }, 1500)
            })
        } else {
            console.log('Erro no cadastro de empresa')
        }
    }).catch(e => {
        console.log(e)
    })
}

function validarEmpresa(cnpj, nomeFantasia, razaoSocial) {
    if (!cnpj || !nomeFantasia || !razaoSocial)
        return 'Preencha todos os campos'

    if (!validarCNPJ(cnpj)) return 'Insira um cnpj válido'

    return 'Válido'
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '')

    if (cnpj == '') return false

    if (cnpj.length != 14)
        return false

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0
    pos = tamanho - 7
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false

    tamanho = tamanho + 1
    numeros = cnpj.substring(0, tamanho);
    soma = 0
    pos = tamanho - 7
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false

    return true
}

document.querySelector('#btCadastrar').addEventListener('click', () => {
    cadastrarEndereco(cadastrarRepresentante()).then(() => {
        setTimeout(() => {
            cadastrarEmpresa()
        }, 600)
    })
})

iCnpj.addEventListener('input', () => {
    iCnpj.value = iCnpj.value.replace(/\D/g, "")
    iCnpj.value = iCnpj.value.replace(/^(\d{2})(\d)/, "$1.$2")
    iCnpj.value = iCnpj.value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    iCnpj.value = iCnpj.value.replace(/\.(\d{3})(\d)/, ".$1/$2")
    iCnpj.value = iCnpj.value.replace(/(\d{4})(\d)/, "$1-$2")
})

function passarForms() {
    const empresa = document.getElementById("forms-empresa");
    const representante = document.getElementById("forms-representante");

    const spanErroCnpj = document.getElementById("error-cnpj")
    var respostaCnpj = document.getElementById("iCnpj").value

    const spanErroNomeFantasia = document.getElementById("error-nome-fantasia")
    var respostaNomeFantasia = document.getElementById("iNomeFantasia").value

    const spanErroRazaoSocial = document.getElementById("error-razao-social")
    var respostaRazaoSocial = document.getElementById("iRazaoSocial").value

    const spanErroCep = document.getElementById("error-cep")
    var respostaCep = document.getElementById("iCep").value

    const spanErroNumero = document.getElementById("error-numero")
    var respostaNumero = document.getElementById("iNumero").value

    var respostaUf = document.getElementById("iUf").value

    const spanErroUf = document.getElementById("error-uf")
    const spanErroCidade = document.getElementById("error-cidade")
    const spanErroBairro = document.getElementById("error-bairro")
    const spanErroLogradouro = document.getElementById("error-logradouro")

    spanErroCnpj.innerHTML = ""
    spanErroNomeFantasia.innerHTML = ""
    spanErroRazaoSocial.innerHTML = ""
    spanErroCep.innerHTML = ""
    spanErroNumero.innerHTML = ""
    spanErroUf.innerHTML = ""
    spanErroCidade.innerHTML = ""
    spanErroBairro.innerHTML = ""
    spanErroLogradouro.innerHTML = ""


    var mensagemErro;

    validarCNPJ(respostaCnpj);

    if (validarCNPJ(respostaCnpj) == false) {
        spanErroCnpj.innerHTML = "CNPJ inválido"
    }

    if (respostaCnpj == "" &&
        respostaNomeFantasia == "" &&
        respostaRazaoSocial == "" &&
        respostaCep == "" &&
        respostaNumero == "") {
        spanErroCnpj.innerHTML = "CNPJ inválido"
        spanErroNomeFantasia.innerHTML = "Campo obrigatório"
        spanErroRazaoSocial.innerHTML = "Campo obrigatório"
        spanErroCep.innerHTML = "Campo obrigatório"
        spanErroNumero.innerHTML = "Campo obrigatório"
        spanErroUf.innerHTML = "Campo obrigatório"
        spanErroCidade.innerHTML = "Campo obrigatório"
        spanErroBairro.innerHTML = "Campo obrigatório"
        spanErroLogradouro.innerHTML = "Campo obrigatório"
    }

    if (respostaNomeFantasia == "") {
        mensagemErro = "Campo obrigatório"
        spanErroNomeFantasia.innerHTML = mensagemErro
    }

    if (respostaRazaoSocial == "") {
        mensagemErro = "Campo obrigatório"
        spanErroRazaoSocial.innerHTML = mensagemErro
    }

    if (respostaCep == "") {
        mensagemErro = "Campo obrigatório"
        spanErroCep.innerHTML = mensagemErro
    }

    if (respostaNumero == "") {
        mensagemErro = "Campo obrigatório"
        spanErroNumero.innerHTML = mensagemErro
    }

    if (respostaCep != "" && respostaUf == "") {
        mensagemErro = "Busque o CEP"
        spanErroCep.innerHTML = mensagemErro
    }

    if (validarCNPJ(respostaCnpj) == true &&
        respostaNomeFantasia != "" &&
        respostaRazaoSocial != "" &&
        respostaUf != "" &&
        respostaNumero != "") {
        empresa.style.display = "none";
        console.log("removeu display");

        representante.style.display = "flex";
        console.log("adicionou display");
    }
}