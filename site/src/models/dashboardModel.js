var database = require("../database/config")

function obterInfoHardware(fkComputador) {
    console.log('entrou na model')
    var instrucao = `
        SELECT * from hardware WHERE fkComputador = ${fkComputador};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);

    return database.executar(instrucao);
}

module.exports = {
    obterInfoHardware
};