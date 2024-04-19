var database = require("../database/config")

function obterDados() {
    console.log('entrou na model')
    var instrucao = `
        SELECT * from hardware;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    obterDados
};