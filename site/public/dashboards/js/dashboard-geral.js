const listaLanhouses = document.querySelector('.lista-lanhouses')

document.querySelector('#btCadastrarLanhouse').addEventListener('click', () => {window.location.href = `${window.location.origin}/cadastro-lanhouse.html`})

fetch(`${window.location.origin}/lanhouses/listar`, { cache: 'no-store' }).then(res => {
    if (res.ok) {
        res.json().then(json => {
            console.log(json);
            json.forEach(lanhouse => {
                listaLanhouses.innerHTML += `<tr>
                    <td>${lanhouse.idLanHouse}</td>
                    <td>${lanhouse.unidade}</td>
                    <td>${lanhouse.cnpj}</td>
                    <td>${lanhouse.nome}</td>
                    <td>${lanhouse.email}</td>
                    <td>${lanhouse.logradouro}, ${lanhouse.numero}</td>
                    <td><div class='status-indicador ${lanhouse.status == 1 ? 'status-ativo' : 'status-bloqueado'}'></div></td>
                </tr>`
            })
        })
    } else {
        console.log('erro na listagem')
    }
})