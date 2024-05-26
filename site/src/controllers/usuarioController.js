var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.params.email;
    var senha = req.params.senha;
    
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
        .then((resultado) => {
          res.status(200).json(resultado);
        })
        .catch((erro) => {
          res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa', erro });
        });
    }
}

function cadastrarFun(req, res){
    var nomeVar = req.body.nomeServer;
    var cpfVar = req.body.cpfServer;
    var emailVar = req.body.emailServer;
    var senhaVar = req.body.senhaServer;
    var cargoVar = req.body.cargoServer;
    var fkEmpresaVar = req.body.fkEmpresaServer;

    if (nomeVar == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpfVar == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (emailVar == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if(senhaVar == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if(fkEmpresaVar == undefined){
        res.status(400).send("O id empresa está undefined!");
    } else {
        usuarioModel.cadastrarFun(nomeVar, cpfVar, emailVar, senhaVar, cargoVar, fkEmpresaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
                    console.log("enviou p model")
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarId(req, res) {
    var email = req.params.email;
    
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {
        usuarioModel.buscarId(email)
        .then((resultado) => {
          res.status(200).json(resultado);
        })
        .catch((erro) => {
          res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa', erro });
        });
    }
}

function alterarSenha(req, res) {
    var novaSenha = req.body.novaSenha;
    var idFuncionario = req.body.idFuncionario;
    
    usuarioModel.alterarSenha(novaSenha, idFuncionario)
    .then(function (resultado) {
                res.json(resultado);
            })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
        );
    }
    
    function buscarInfo(req, res) {
        var idFuncionario = req.params.idFuncionario;
        
        if (idFuncionario == undefined) {
            res.status(400).send("Seu id está undefined!");
        } else {
            usuarioModel.buscarInfo(idFuncionario)
            .then((resultado) => {
              res.status(200).json(resultado);
            })
            .catch((erro) => {
              res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa', erro });
            });
        }
    }

    
    function alterarInfo(req, res) {
        var idFuncionario = req.body.idFuncionario;

        var imagem = req.body.imagem ;
        var nome = req.body.nome ;
        var cpf = req.body.cpf;
        var email = req.body.email;
        var senha = req.body.senha;
        var cargo = req.body.cargo;
        
        usuarioModel.alterarInfo(idFuncionario, imagem, nome, cpf, email, senha, cargo)
        .then(function (resultado) {
                res.json(resultado);
            })
        .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function exibirFun(req, res){
    var idEmpresa = req.params.idEmpresa;
    
    usuarioModel.exibirFun(idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}


function buscarInfoAlerta(req, res) {
    // var idFuncionario = req.params.idFuncionario;
    
    // if (idFuncionario == undefined) {
    //     res.status(400).send("Seu id está undefined!");
    // } else {
        usuarioModel.buscarInfoAlerta()
        .then((resultado) => {
          res.status(200).json(resultado);
        })
        .catch((erro) => {
          res.status(500).json({ mensagem: 'Erro ao buscar ID da empresa', erro });
        });
    // }
}

function alterarInfoAlerta(req, res) {
    // var idFuncionario = req.body.idFuncionario;

    var minimoDisco = req.body.minimoDisco ;
    var maximoDisco = req.body.maximoDisco ;
    var minimoCpu = req.body.minimoCpu;
    var maximoCpu = req.body.maximoCpu;
    var minimoRam = req.body.minimoRam;
    var maximoRam = req.body.maximoRam;
    var minimoProblema = req.body.minimoProblema;
    var minimoIdeal = req.body.minimoIdeal;
    var maximoCuidado = req.body.maximoCuidado;
    var maximoProblema = req.body.maximoProblema;
    
    usuarioModel.alterarInfoAlerta(minimoDisco, maximoDisco, minimoCpu, maximoCpu, minimoRam, maximoRam, minimoProblema, minimoIdeal, maximoCuidado, maximoProblema)
    .then(function (resultado) {
            res.json(resultado);
        })
    .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}



module.exports = {
    autenticar,
    cadastrarFun,
    buscarId,
    alterarSenha,
    buscarInfo,
    alterarInfo,
    exibirFun,
    buscarInfoAlerta,
    alterarInfoAlerta
}