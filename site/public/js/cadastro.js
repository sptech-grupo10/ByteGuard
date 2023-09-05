let senhaValidada = false,
  senhasIdenticas = false;
let cookie8char = document.querySelector(".cookie.c8char");
let cookiemaiuscula = document.querySelector(".cookie.maiuscula");
let cookienums = document.querySelector(".cookie.nums");
let cookieespec = document.querySelector(".cookie.espec");
let cookieSenhasIdenticas = document.querySelector(".senhasIdenticas");
let inputSenha = document.querySelector("#isenha");
let inputConfirmSenha = document.querySelector("#iconfirmsenha");

document.querySelector("#btCadastrar").addEventListener("click", () => {
  validarCadastro(
    document.querySelector("#iusername").value,
    document.querySelector("#iemail").value
  );
});

const verificarCookies = () => {
  if (
    inputSenha.value.length < 8 &&
    cookie8char.classList.contains("validado")
  ) {
    cookie8char.classList.remove("validado");
  } else if (
    inputSenha.value.length > 7 &&
    !cookie8char.classList.contains("validado")
  ) {
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
  document.querySelectorAll(".cookie.validado").length < 4
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
  if (username.length < 5) {
    alert("Insira um nome com mais de 4 letras");
  } else if (!email.split("").includes("@") || !email.split("@")[1]) {
    alert("Insira um email válido");
  } else if (!senhaValidada) {
    alert("Cumpra todos os requisitos da senha");
  } else if (!senhasIdenticas) {
    alert("Confirme sua senha cumprindo o requisito");
  } else {
    alert("Login realizado");
  }
}
