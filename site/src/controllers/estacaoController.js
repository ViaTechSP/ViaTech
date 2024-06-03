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
    var idLinha = req.params.idLinha;

    linhaModel.deletarLinha(idLinha)
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

    var idLinha = req.params.idEstacao;
    var nome = req.body.nome;
    var numero = req.body.numero;
    
    console.log('id =>', idLinha)
    console.log('nome =>', nome)
    console.log('numero =>', numero)

    linhaModel.salvarLinha(numero, nome, idLinha)
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