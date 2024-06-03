function exibirEstacao(idEstacao){
    document.getElementById('divAdd').style.display = 'none';
    document.getElementById('frase').style.display = 'none';
    document.getElementById('ver').style.color = '#F27A5E';
    document.getElementById('add').style.color = 'black';
    document.getElementById('container-estacao').style.display = 'block';
    document.getElementById('container-estacao').style.display = 'flex';

    var idLinha = select_linha.value
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var container = document.getElementById('container-estacao');  
    var lista_estacao = [];

    container.innerHTML ="";

     fetch(`/estacao/exibirEstacao/${idLinha}`, { 
        method: "GET", 
      }).then(function (resposta) {
        // var teste = resposta[0].idEstacao;
        // console.log(teste)
     
        if (!resposta.ok) { 
          swal("Ops", 'Parce que você ainda não possuí estações cadastradas!');
          throw new Error('Erro na requisição');
         }
        return resposta.json();
       })
       
       .then((resposta) => { 
       lista_estacao = resposta;

       if (lista_estacao.length === 0) {
        swal({
            title: "Ops",
            text: "Parece que você ainda não possui estações cadastradas!",
            icon: "warning",
            // buttons: {
            //     cancel: "Cancelar",
            //     confirm: "OK"
            // }
        }).then((confirmacao) => {
            if (confirmacao) {
                // Se o usuário confirmar, chama a função exibirDivAddEstacao
                exibirDivAddEstacao();
            }
        });
    }

    
          
     var tamanhoEstacao = lista_estacao.length;
     var auxiliar = 0;

     for (var i = 0; i < tamanhoEstacao; i++) {
       var id_estacao = lista_estacao[i].idEstacao
       var nome_atual = lista_estacao[i].nome;
       var numero_atual = lista_estacao[i].numero;
      
       auxiliar++;

       container.innerHTML += `<div class="quadrado-estacao">
       <span class="material-symbols-outlined cancelar selecionar" onclick="exibirEstacao(${id_estacao})" id="cancelar_${id_estacao}" style="display: none;">cancel</span>

       <div class="nomeNumero">
         <p> Nome: <input id="input_nome_${id_estacao}" type="text" disabled value="${nome_atual}" class="input-container"></p> <span class="material-symbols-outlined selecionar" onclick="deletarEstacao(${id_estacao})">delete</span>
       </div>
      
        <button id="botao_salvar_${id_estacao}" onclick="salvarEstacao(${id_estacao})" class="botao-cadastrar" style="display: none;">SALVAR</button>`;       

     }
   });
}

function listarLinhas(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var select = document.getElementById("select_linha");
  
    fetch(`/linha/exibirLinha/${idEmpresa}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          resposta.forEach(function (resposta) {

            var option = document.createElement("option");
            option.value = resposta.idLinha;
            option.text = resposta.nome;
            select.appendChild(option);
          
          });
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })          
}

function deletarEstacao(idEstacao) {
  swal({
    title: "Cuidado!",
    text: "A estação será deletada. Você tem certeza que deseja continuar?",
    icon: "warning",
    buttons: {
       cancel: "Cancelar",
       confirm: "SIM!"
    }
}).then((confirmacao) => {
    if (confirmacao) {

        console.log('id estacao=>', idEstacao);
        fetch(`/estacao/deletarEstacao/${idEstacao}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
          },
        }).then(function (resposta) {
          if (resposta.ok) {
            swal({
              title: "Sucesso!",
              text: "A estacao foi excluída!",
              icon: "success",
          }).then((confirmacao) => {
            if(confirmacao){
              exibirEstacao();
            }
          })
      
          } else {
            resposta.text().then(function (texto) {
            });
          }
        }).catch(function (error) {
        });
    }
});
}



function exibirDivAddEstacao(){


  document.getElementById('divAdd').style.display = 'block';
  document.getElementById('divAdd').style.display = 'flex';
  document.getElementById('container-estacao').style.display = 'none';
  document.getElementById('frase').style.display = 'none';
  document.getElementById('ver').style.color = 'black';
  document.getElementById('add').style.color = '#F27A5E';
  
  // var container = document.getElementById('container-estacao');  
  // container.display = 'none';

}

function cadastrarEstacao(){
    var nome = ipt_nome.value;
    var idEmpresa = sessionStorage.ID_EMPRESA

    if(nome !== ''){
        fetch("/estacao/cadastrarEstacao", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome,
              idEmpresa: idEmpresa,
              idLinha: select_linha.value
            }),
          }).then(function (resposta) {
                swal('Eba!', 'Estacao cadastrada!', 'success');
            }
          )}
    else{
        swal('Ei!', 'Preencha o campo!', 'error');
    }

}


function editarEstacao(idEstacao){
  console.log('numero do id -> ', idEstacao)

   var mudarClasseNome = document.getElementById(`input_nome_${idEstacao}`);

    
    mudarClasseNome.classList.remove('input-container'); 
    mudarClasseNome.classList.add('input-container-editar');

    mudarClasseNome.disabled = false; 
    
    document.getElementById(`cancelar_${idEstacao}`).style.display = 'block';

    var botaoSalvar = document.getElementById(`botao_salvar_${idEstacao}`);
    if (botaoSalvar) {
        botaoSalvar.style.display = 'block';
    } else {
        console.error(`Elemento com ID "botao_salvar_${idEstacao}" não encontrado.`);
    }
    // if (botaoSalvar) {
    //     botaoSalvar.style.display = 'block';
    // }

  // document.querySelector('button').style.display = 'block';
}

function salvarEstacao(idEstacao){

  var nome = document.getElementById(`input_nome_${idEstacao}`).value;
  console.log('id da estacao ==>',idEstacao);

  // alert(idEstacao, nome)



  if(nome !== '' && idEstacao !== ''){
    fetch(`/estacao/salvarEstacao/${idEstacao}`,{
       method: "PUT", headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
         nome: nome,
        //  idEstacao: idEstacao
      })
    }).then(function (resposta) {
        if (resposta.ok) {

          swal('Sucesso!', "Informações alteradas!", 'success');

           exibirEstacao();          
          
           var mudarClasseNome = document.getElementById("input_nome");

           mudarClasseNome.classList.remove('input-container-editar'); 
           mudarClasseNome.classList.add('input-container');

           mudarClasseNome.disabled = true; 
           
           document.querySelector('button').style.display = 'none';
        } else {
         swal('Erro!', 'Não foi possível alterar os dados da estacao', 'error')
        }
      }).catch(function (resposta) {
       console.log(`#ERRO: ${resposta}`);
      });
  } else{
   swal("Ei!", "Preencha todos os campos!");
  }
}



