const iNome = document.querySelector('#iNome'),
    iTelefone = document.querySelector('#iTelefone'),
    iEmail = document.querySelector('#iEmail'),
    iCpf = document.querySelector('#iCpf')

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

const alertar = () => {
    alert('sim')
}