const database = require('../database/config')

function retornarUsuarios() {
    database.exec('SELECT * FROM Usuario').then(usuarios => {
        console.log(usuarios)
    })
}

module.exports = {
    retornarUsuarios
}