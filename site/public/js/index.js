let descTitles = document.querySelectorAll('.desc-left .desc-title')
let titleListBorder = document.querySelector('.desc-left .title-list-border')
let spanDescText = document.querySelector('.span-desc-text')
window.addEventListener('DOMContentLoaded', ()=>{
    mudarSpanDescText()
})

function exibirOpcoesLoginCadastro() {
    var divOpcoes = document.getElementById("opcoes-login-cadastro");
    if (divOpcoes.style.display != "flex") {
        divOpcoes.style.display = "flex";
    } else {
        divOpcoes.style.display = "none";
    }
}

function mudarSpanDescText() {
    let descTitleActive = document.querySelector('.desc-title.active')
    if (descTitleActive.classList.contains('title-integridade')) {
        spanDescText.innerText = 'A integridade é o nosso alicerce. Nosso compromisso com a integridade é evidente em tudo o que fazemos. Desenvolvemos e implementamos soluções de monitoramento de desempenho para garantir que cada partida seja uma demonstração genuína de habilidade e talento.'
        document.querySelector('.desc-right').style.backgroundImage = "url('./assets/imgs/integridade-img.png')"
    }else if(descTitleActive.classList.contains('title-inovacao')){
        spanDescText.innerText = 'A inovação está no centro do nosso DNA, e é isso que nos permite liderar o caminho na promoção da integridade e justiça nos e-Sports. Estamos constantemente buscando maneiras de aprimorar e avançar em nossa tecnologia para garantir que ela esteja sempre na vanguarda da indústria de e-Sports.'
        document.querySelector('.desc-right').style.backgroundImage = "url('./assets/imgs/inovacao-img.png')"
    }else if(descTitleActive.classList.contains('title-equidade')){
        spanDescText.innerText = 'Nossa missão é assegurar que todas as partidas sejam disputadas em um campo de jogo nivelado, onde o talento e a habilidade sejam os únicos determinantes do sucesso.'
        document.querySelector('.desc-right').style.backgroundImage = "url('./assets/imgs/equidade-img.png')"
    }
}

descTitles.forEach(title => {
    title.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            descTitles.forEach(checkactive => {
                if (checkactive.classList.contains('active')) {
                    checkactive.classList.remove('active')
                }
            })
            e.target.classList.add('active')
            titleListBorder.style.setProperty('--title-border-top', e.target.getAttribute('border') + '%')

        }
        mudarSpanDescText()
    })
})

if (window.outerWidth < 600) {
    document.querySelector('.options-icon').addEventListener('click', (e) => {
        verticalNavStyle = document.querySelector('.vertical-nav').style
        if (verticalNavStyle.left == '-100%') {
            verticalNavStyle.left = '0%'
        } else {
            verticalNavStyle.left = '-100%'
        }
    })
}