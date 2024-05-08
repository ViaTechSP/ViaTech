var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

    usuarioModel.autenticar(email, senha)
    .then(function (resposta) {
        if (resposta.length == 0) {
            res.status(403).send("Email e/ou senha inválido(s)");
        } else {
            res.status(200).json(resposta);
        }      
    }).catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
    }
}

function cadastrar(req, res) {
    var nomeFantasiaVar = req.body.nomeFantasiaServer;
    var cnpjVar = req.body.cnpjServer;
    var telefoneVar = req.body.telefoneSerer;
    var emailVar = req.body.emailServer;
    var senhaVar = req.body.senhaServer;    

    if (nomeFantasiaVar == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpjVar == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senhaVar == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (telefoneVar == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if(emailVar == undefined) {
        res.status(400).send("Seu email está undefined!");
    } 
    else {

        usuarioModel.cadastrar(nomeFantasiaVar, cnpjVar, telefoneVar, emailVar, senhaVar)
            .then(
                function (resultado) {
                    res.json(resultado);
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

function pegarId(req, res) {

    var email = req.body.emailServer;
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else {

      usuarioModel.pegarId(email)
        .then(
             function (resposta) {
                 if (resposta.length == 0) {
                 res.status(403).send("Email inválido(s)");
                } else {
                 res.status(200).json(resposta);
                }      
            }
        ).catch(
             function (erro) {
                 console.log(erro);
                 console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                 res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function alterarSenha(req, res) {
    var novaSenhaVar = req.body.novaSenha;
    var idEmpresaVar = req.body.idEmpresa;

    usuarioModel.alterarSenha(novaSenhaVar, idEmpresaVar)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function cadastrarFun(req, res){
    var nomeVar = req.body.nomeServer;
    var cpfVar = req.body.cpfServer;
    var telefoneVar = req.body.telefoneSerer;
    var emailVar = req.body.emailServer;
    var senhaVar = req.body.senhaServer;
    var cargoVar = req.body.cargoServer;  
    var fkEmpresaVar = req.body.idEmpresaSever;

    console.log(fkEmpresaVar)


    if (nomeVar == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpfVar == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senhaVar == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if(emailVar == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (telefoneVar == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if(cargoVar == undefined){
        res.status(400).send("Seu cargo está undefined!");
    } else if(fkEmpresaVar == undefined){
        res.status(400).send("O id empresa está undefined!");
    } else {

        usuarioModel.cadastrarFun(fkEmpresaVar, nomeVar, cpfVar, telefoneVar, cargoVar, emailVar, senhaVar)
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

// function exibirFun(req, res){

//     var usuario_receber = require("../routes/usuarios");
//     // var comentario_post1 = req.body.comentario_post1Server;
//     var comentario_post6 = req.body.comentario_post6Server;
//     var fk_usuario = req.params.fk_usuario;


//     // Faça as validações dos valores
//     if (comentario_post6 == undefined) {
//         res.status(400).send("Seu comentario está undefined!");
//     // }
//     } else if (fk_usuario == undefined) {
//         res.status(400).send("Seu id está undefined!");
//     } else if (fk_post == undefined) {
//         res.status(400).send("Seu id está undefined!");
//     } 
//     else {
    
//         usuarioModel.comentar_6(fk_usuario, comentario_post6)
//           .then(
//               function (resultado) {
//                   res.json(resultado);
       
//               }
//           )
//             .catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log(
//                         "\nHouve um erro ao realizar o cadastro! Erro: ",
//                         erro.sqlMessage
//                     );
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }
// }

function exibirFun(req, res){
    var idEmpresa = req.params.idEmpresa;
    
    usuarioModel.exibirFun(idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}



module.exports = {
    autenticar,
    cadastrar,
    pegarId,
    alterarSenha,
    cadastrarFun,
    exibirFun
}