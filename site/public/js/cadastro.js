let senhaValidada = false,
  senhasIdenticas = false;
let cookie8char = document.querySelector(".validadores-icon.c8char");
let cookiemaiuscula = document.querySelector(".validadores-icon.maiuscula");
let cookienums = document.querySelector(".validadores-icon.nums");
let cookieespec = document.querySelector(".validadores-icon.espec");
let cookieSenhasIdenticas = document.querySelector(".validadores-icon.identicas");
let inputSenha = document.querySelector("#isenha");
let inputConfirmSenha = document.querySelector("#iconfirmsenha");
let errorCookieNome = document.querySelector('.error-cookie.nome');
let errorCookieEmail = document.querySelector('.error-cookie.email');
let errorCookieSenha = document.querySelector('.error-cookie.senha');
let errorCookieConfirmSenha = document.querySelector('.error-cookie.confirmSenha');

document.querySelector("#btCadastrar").addEventListener("click", () => {
  validarCadastro(
    document.querySelector("#iusername").value,
    document.querySelector("#iemail").value
  );
});

const verificarCookies = () => {
  console.log('verificnaod');
  if (inputSenha.value.length < 8 && cookie8char.classList.contains("validado")) {
    cookie8char.classList.remove("validado");
  } else if (inputSenha.value.length > 7 && !cookie8char.classList.contains("validado")) {
    cookie8char.classList.add("validado");
  }

  if (
    !/[A-Z]/gm.test(inputSenha.value) &&
    cookiemaiuscula.classList.contains("validado")
  ) {
    cookiemaiuscula.classList.toggle("validado");
  } else if (
    /[A-Z]/gm.test(inputSenha.value) &&
    !cookiemaiuscula.classList.contains("validado")
  ) {
    cookiemaiuscula.classList.toggle("validado");
  }

  if (
    !/[0-9]/gm.test(inputSenha.value) &&
    cookienums.classList.contains("validado")
  ) {
    cookienums.classList.toggle("validado");
  } else if (
    /[0-9]/gm.test(inputSenha.value) &&
    !cookienums.classList.contains("validado")
  ) {
    cookienums.classList.toggle("validado");
  }

  if (
    !/[[!@#$%*()_+^&{}}:;?.]/gm.test(inputSenha.value) &&
    cookieespec.classList.contains("validado")
  ) {
    cookieespec.classList.toggle("validado");
  } else if (
    /[[!@#$%*()_+^&{}}:;?.]/gm.test(inputSenha.value) &&
    !cookieespec.classList.contains("validado")
  ) {
    cookieespec.classList.toggle("validado");
  }

  validarSenha();
};

function validarSenha() {
  document.querySelectorAll(".validadores-icon.validado").length < 4
    ? (senhaValidada = false)
    : (senhaValidada = true);
}

inputSenha.addEventListener("input", verificarCookies);
inputConfirmSenha.addEventListener("input", () => {
  if (
    inputConfirmSenha.value == inputSenha.value &&
    !cookieSenhasIdenticas.classList.contains("validado")
  ) {
    cookieSenhasIdenticas.classList.toggle("validado");
  } else if (
    inputConfirmSenha.value != inputSenha.value &&
    cookieSenhasIdenticas.classList.contains("validado")
  ) {
    cookieSenhasIdenticas.classList.toggle("validado");
  }
  validarSenhaConfirmada()
});

function validarSenhaConfirmada() {
  cookieSenhasIdenticas.classList.contains("validado")
    ? (senhasIdenticas = true)
    : (senhasIdenticas = false);
}

function validarCadastro(username, email) {
  errorCookieNome.innerText = ''
  errorCookieEmail.innerText = ''
  errorCookieSenha.innerText = ''
  errorCookieConfirmSenha.innerText = ''
  if (username.length < 5) {
    errorCookieNome.innerText = 'Insira um nome com mais de 5 caracteres'
    errorCookieNome.style.animation = 'shake 0.5s'
    setTimeout(() => {
      errorCookieNome.style.animation = 'none'
    }, 500)
  } else if (!email.split("").includes("@") || !email.split("@")[1]) {
    errorCookieEmail.innerText = 'Insira um email válido'
    errorCookieEmail.style.animation = 'shake 0.5s'
    setTimeout(() => {
      errorCookieEmail.style.animation = 'none'
    }, 500)
  } else if (!senhaValidada) {
    errorCookieSenha.innerText = "Cumpra todos os requisitos da senha"
    errorCookieSenha.style.animation = 'shake 0.5s'
    setTimeout(() => {
      errorCookieSenha.style.animation = 'none'
    }, 500)
  } else if (!senhasIdenticas) {
    errorCookieConfirmSenha.innerText = "Confirme sua senha cumprindo o requisito"
    errorCookieConfirmSenha.style.animation = 'shake 0.5s'
    setTimeout(() => {
      errorCookieConfirmSenha.style.animation = 'none'
    }, 500)
  } else{
    alert('Cadastro realizado!')
  }
}
