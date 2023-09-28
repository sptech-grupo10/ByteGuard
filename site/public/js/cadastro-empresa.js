iCnpj.addEventListener('input', () => {
    iCnpj.value = iCnpj.value.replace(/\D/g, "")
    iCnpj.value = iCnpj.value.replace(/^(\d{2})(\d)/, "$1.$2")
    iCnpj.value = iCnpj.value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    iCnpj.value = iCnpj.value.replace(/\.(\d{3})(\d)/, ".$1/$2")
    iCnpj.value = iCnpj.value.replace(/(\d{4})(\d)/, "$1-$2")
})

const cadastrarEmpresa = () => {
    sessionStorage.clear()

    let validador = validarEmpresa(iCnpj.value, iNomeFantasia.value, iRazaoSocial.value)
    if (validador != 'Válido') {
        cookie.innerText = validador
        return
    }

    fetch(`${window.location.origin}/empresas/cadastrar`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            cnpjServer: iCnpj.value,
            nomeFantasiaServer: iNomeFantasia.value,
            razaoSocialServer: iRazaoSocial.value,
            fkEnderecoServer: sessionStorage.getItem('idEndereco'),
            fkRepresentanteServer: sessionStorage.getItem('idRepresentante')
        })
    }).then(res => {
        if (res.ok) {
            res.json().then(json => {
                sessionStorage.setItem('idEmpresa', json.insertId)
                //window.location.href = `${window.location.origin}/cadastro-lanhouse.html`
            })
        } else {
            console.log('Erro no cadastro de empresa')
        }
    })
}
function validarEmpresa(cnpj, nomeFantasia, razaoSocial) {
    if (!cnpj || !nomeFantasia || !razaoSocial)
        return 'Preencha todos os campos'

    if (!validarCNPJ(cnpj)) return 'Insira um cnpj válido'

    return 'Válido'
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

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
        return false;

    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

document.querySelector('#btCadastrar').addEventListener('click', () => {
    cadastrarEndereco(cadastrarRepresentante(cadastrarEmpresa))
})