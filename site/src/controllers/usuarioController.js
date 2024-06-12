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
            .then(
                function (resultadoAutenticar) {
                    if (resultadoAutenticar.length == 1) {
                        res.status(200).json(resultado);
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.message);
                    res.status(500).json(erro.message);
                }
            );
    }
}

function cadastrarFun(req, res){
    var imagemVar = req.body.imagem;
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
        usuarioModel.cadastrarFun(imagemVar, nomeVar, cpfVar, emailVar, senhaVar, cargoVar, fkEmpresaVar)
            .then(
                function (resultado) {
                if (resultado.affectedRows > 0) {
                    res.json(resultado);
                    console.log("enviou p model")
                } else {
                    res.status(204).send("Nenhuma alteração realizada!");
                }
            }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.message
                    );
                    res.status(500).json(erro.message);
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
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
            console.error('Erro ao buscar ID do funcionário:', erro);
            res.status(500).json({ mensagem: 'Erro ao buscar ID do funcionário', erro: erro.message });
        });
    }
}

function alterarSenha(req, res) {
    var novaSenha = req.body.novaSenha;
    var idFuncionario = req.body.idFuncionario;
    
    if (!novaSenha || !idFuncionario) {
        res.status(400).send("Alguma(s) variável(is) está(ão) undefined!");
    } else {
        usuarioModel.alterarSenha(novaSenha, idFuncionario)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.json(resultado);
            } else {
                res.status(204).send("Nenhuma alteração realizada!");
            }
        })
        .catch(function (erro) {
            console.error('Erro ao alterar senha do funcionário:', erro);
            res.status(500).json({ mensagem: 'Erro ao alterar senha do funcionário', erro: erro.message });
        });
    }
}

function buscarInfo(req, res) {
    var idFuncionario = req.params.idFuncionario;
        
    if (idFuncionario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {
        usuarioModel.buscarInfo(idFuncionario)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
            console.error('Erro ao buscar informações do funcionário:', erro);
            res.status(500).json({ mensagem: 'Erro ao buscar informações do funcionário', erro: erro.message });
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
        
    if (!idFuncionario || !imagem || !nome || !cpf || !email || !senha || !cargo) {
        res.status(400).send("Alguma(s) variável(is) está(ão) undefined!");
    } else {
        usuarioModel.alterarInfo(idFuncionario, imagem, nome, cpf, email, senha, cargo)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.json(resultado);
            } else {
                res.status(204).send("Nenhuma alteração realizada!");
            }
        })
        .catch(function (erro) {
            console.error('Erro ao alterar informações do funcionário:', erro);
            res.status(500).json({ mensagem: 'Erro ao alterar informações do funcionário', erro: erro.message });
        });
    }
}

function exibirFun(req, res){
    var idEmpresa = req.params.idEmpresa;
    
    if (!idEmpresa) {
        res.status(400).send("O id da empresa está undefined!");
    } else {
        usuarioModel.exibirFun(idEmpresa)
        .then((resultado) => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch((erro) => {
            console.error('Erro ao exibir funcionários da empresa:', erro);
            res.status(500).json({ mensagem: 'Erro ao exibir funcionários da empresa', erro: erro.message });
        });
    }
}

function salvarFun(req, res){
    var idFuncionario = req.params.idFuncionario;
    var img = req.body.img;
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var email = req.body.email;
    var cargo = req.body.cargo;
    
    if (!idFuncionario || !img || !nome || !cpf || !email || !cargo) {
        res.status(400).send("Alguma(s) variável(is) está(ão) undefined!");
    } else {
        usuarioModel.salvarFun(img, nome, cpf, email, cargo, idFuncionario)
        .then(function (resultado) {
            if (resultado.affectedRows > 0) {
                res.json(resultado);
            } else {
                res.status(204).send("Nenhuma alteração realizada!");
            }
        })
        .catch(function (erro) {
            console.error('Erro ao salvar funcionário:', erro);
            res.status(500).json({ mensagem: 'Erro ao salvar funcionário', erro: erro.message });
        });
    }
}

function deletarFun(req, res) {
    var idFuncionario = req.params.idFuncionario;

    if (!idFuncionario) {
        res.status(400).send("O id do funcionário está undefined!");
    } else {
        usuarioModel.deletarFun(idFuncionario)
        .then(
            function (resultado) {
                if (resultado.affectedRows > 0) {
                    res.json(resultado);
                } else {
                    res.status(204).send("Nenhuma alteração realizada!");
                }
            }
        )
        .catch(
            function (erro) {
                console.error('Erro ao deletar o funcionário:', erro);
                res.status(500).json({ mensagem: 'Erro ao deletar o funcionário', erro: erro.message });
            }
        );
    }
}

module.exports = {
    autenticar,
    cadastrarFun,
    buscarId,
    alterarSenha,
    buscarInfo,
    alterarInfo,
    exibirFun,
    salvarFun,
    deletarFun
}