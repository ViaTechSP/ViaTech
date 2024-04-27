var database = require("../database/config")

function autenticar(emailVar, senhaVar) {
    return new Promise((resolve, reject) => {
        // Consulta para empresa
        var instrucaoEmpresa = `
            SELECT idEmpresa, nomeFantasia, email, senha, telefone, CNPJ 
            FROM empresa 
            WHERE email = '${emailVar}' AND senha = '${senhaVar}';
        `;
        
        var instrucaoFuncionario = `
            SELECT idFuncionario, nome, email, senha, cargo 
            FROM funcionario 
            WHERE email = '${emailVar}' AND senha = '${senhaVar}';
        `;

        console.log("Executando a instrução SQL para empresa: \n" + instrucaoEmpresa);
        console.log("Executando a instrução SQL para funcionário: \n" + instrucaoFuncionario);

        database.executar(instrucaoEmpresa, [emailVar, senhaVar])
            .then(resultadoEmpresa => {
                if (resultadoEmpresa.length > 0) {
                    resolve({ tipo: 'empresa', dados: resultadoEmpresa });
                } else {
                    return database.executar(instrucaoFuncionario, [emailVar, senhaVar]);
                }
            })
            .then(resultadoFuncionario => {
                if (resultadoFuncionario && resultadoFuncionario.length > 0) {
                    resolve({ tipo: 'funcionario', dados: resultadoFuncionario });
                } else {
                    reject(new Error("Autenticação falhou"));
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

function cadastrar(nomeFantasiaVar, cnpjVar, telefoneVar, emailVar, senhaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeFantasiaVar, cnpjVar, telefoneVar, emailVar, senhaVar);
    
    var instrucao = `
        INSERT INTO empresa (nomeFantasia, CNPJ, telefone, email, senha) VALUES ('${nomeFantasiaVar}', '${cnpjVar}', '${telefoneVar}', '${emailVar}', '${senhaVar}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// function pegarId(emailVar) {
//     var instrucao = `
//         SELECT idEmpresa, nomeFantasia, email, senha, telefone, CNPJ FROM empresa WHERE email = '${emailVar}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);

//     return database.executar(instrucao);
// }

function alterarSenha(novaSenhaVar, idEmpresaVar) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ");
    var instrucao = `
        UPDATE empresa SET senha = '${novaSenhaVar}' WHERE idEmpresa = ${idEmpresaVar};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFun(fkEmpresaVar, nomeVar, cpfVar, telefoneVar, cargoVar, emailVar, senhaVar) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    var instrucao = `
        INSERT INTO funcionario (fkEmpresa, nome, cpf, telefone, cargo, email, senha) VALUES ('${fkEmpresaVar}', '${nomeVar}', '${cpfVar}', '${telefoneVar}', '${cargoVar}', '${emailVar}', '${senhaVar}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function exibirFun(){
    var query = `SELECT idFuncionario, funcionario.nome, funcionario.cargo, funcionario.cpf, funcionario.email FROM funcionario JOIN empresa ON empresa.idEmpresa = fkEmpresa WHERE fkEmpresa = 2;`;

    return database.executar(query);
}

module.exports = {
    autenticar,
    cadastrar,
    // pegarId,
    alterarSenha,
    cadastrarFun, 
    exibirFun
};