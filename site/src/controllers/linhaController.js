var linhaModel = require("../models/linhaModel");

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

function exibirLinha(req, res){
    var idEmpresa = req.params.idEmpresa;
    
    linhaModel.exibirLinha(idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

function deletarLinha(req, res) {
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

function cadastrarLinha(req, res){
    var nome = req.body.nome;
    var numero = req.body.numero;
    var idEmpresa = req.body.idEmpresa;
    
    
    linhaModel.cadastrarLinha(nome, numero, idEmpresa).then((resultado) => {
        res.status(200).json(resultado);
    });
}

module.exports = {
    // buscarLinhas,
    exibirLinha,
    deletarLinha,
    cadastrarLinha
}