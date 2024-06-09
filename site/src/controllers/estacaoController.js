var estacaoModel = require("../models/estacaoModel");

// function buscarLinhas(req, res) {
//     var idEmpresa = req.params.idEmpresa;

//     linhaModel.buscarLinhas(idEmpresa).then(function (resultado) {
//         if (resultado.length > 0) {
//             res.status(200).json(resultado);
//         } else {
//             res.status(204).send("Nenhum resultado encontrado!")
//         }
//     })
// }

function exibirEstacao(req, res){
    var idLinha = req.params.idLinha;
    
    estacaoModel.exibirEstacao(idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function deletarEstacao(req, res) {
    var idEstacao = req.params.idEstacao;

    estacaoModel.deletarEstacao(idEstacao)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar a linha: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarEstacao(req, res){
    var nome = req.body.nome;
    var idLinha = req.body.idLinha;
    
    
    estacaoModel.cadastrarEstacao(nome, idLinha).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function salvarEstacao(req, res) {
    console.log("tamo no controler")

    var idEstacao = req.params.idEstacao;
    var nome = req.body.nome;
    
    console.log('id =>', idEstacao)
    console.log('nome =>', nome)

    estacaoModel.salvarEstacao(nome, idEstacao)
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
    // buscarLinhas,
    deletarEstacao,
    cadastrarEstacao,
    salvarEstacao,
    exibirEstacao
}