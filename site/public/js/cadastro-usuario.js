document.querySelector("#btCadastrar").addEventListener("click", () => {
  if (validarCadastro(
    document.querySelector("#iusername").value,
    document.querySelector("#iemail").value
  )) {
    cadastrar(document.querySelector('#iusername').value, document.querySelector('#iemail').value, document.querySelector('#isenha').value)
  }
});

function cadastrar(nome, email, senha) {
  fetch(`${window.location.origin}/usuarios/cadastrar`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      nomeServer: nome,
      emailServer: email,
      senhaServer: senha,
      tipoUsuarioServer: sessionStorage.getItem('tipoUsuario'),
      fkEmpresaServer: sessionStorage.getItem('tipoUsuario') == 1 ? sessionStorage.getItem('idEmpresa') : null,
      fkLanHouseServer: sessionStorage.getItem('tipoUsuario') == 2 ? sessionStorage.getItem('idLanhouse') : null
    })
  }).then(res => {
    if (res.ok) {
      res.json().then(json => {
        sessionStorage.setItem('idUsuarioEmpresa', json.insertId)
        let divSuccess = document.getElementById("success")
        divSuccess.style.display = "flex"
        setTimeout(() => {
          window.location.href = sessionStorage.getItem('tipoUsuario') == 1 ? `${window.location.origin}/cadastro-lanhouse.html` : `${window.location.origin}/login.html`
        }, 1500)
      })
    } else {
      console.log('Erro no cadastro')
    }
    console.log(res);
  }).catch(e => {
    console.log(`Erro: ${e}`)
  })
}