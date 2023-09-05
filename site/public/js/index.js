let descTitles = document.querySelectorAll('.desc-left .desc-title')
let titleListBorder = document.querySelector('.desc-left .title-list-border')

descTitles.forEach(title => {
    title.addEventListener('click', (e) => {
        if (!e.target.classList.contains('active')) {
            descTitles.forEach(checkactive => {
                if (checkactive.classList.contains('active')) {
                    checkactive.classList.remove('active')
                }
            })
            e.target.classList.add('active')
            titleListBorder.style.setProperty('--title-border-top', e.target.getAttribute('border')+'%')

        }
    })
})