function exibirLinha(){
    document.getElementById('divAdd').style.display = 'none';
    document.getElementById('ver').style.color = '#F27A5E';
    document.getElementById('add').style.color = 'black';
    document.getElementById('container-linha').style.display = 'block';
    document.getElementById('container-linha').style.display = 'flex';


    var idEmpresa = sessionStorage.ID_EMPRESA;
    var container = document.getElementById('container-linha');  
    var lista_linha = [];

    container.innerHTML ="";



     fetch(`/dashboard/exibirLinha/${idEmpresa}`, { 
        method: "GET", 
      }).then(function (resposta) {
     
        if (!resposta.ok) { 
          swal("Ops", 'Parce que você ainda não possuí linhas cadastradas!');
          throw new Error('Erro na requisição');
         }
        return resposta.json();
       })
       

       .then((resposta) => { 
       lista_linha = resposta;

       if (lista_linha.length === 0) {
        swal({
            title: "Ops",
            text: "Parece que você ainda não possui linhas cadastradas!",
            icon: "warning",
            // buttons: {
            //     cancel: "Cancelar",
            //     confirm: "OK"
            // }
        }).then((confirmacao) => {
            if (confirmacao) {
                // Se o usuário confirmar, chama a função exibirDivAddLinha
                exibirDivAddLinha();
            }
        });
    }
          
     var tamanhoLinha = lista_linha.length;
     var auxiliar = 0;

     for (var i = 0; i < tamanhoLinha; i++) {
       var id_linha = lista_linha[i].idLinha
       var nome_atual = lista_linha[i].nome;
       var numero_atual = lista_linha[i].numero;
      
       auxiliar++;

       container.innerHTML += `<div class="quadrado-linha">
       <div class="nomeNumero">
         <p> Nome: <input id="input_nome" type="text" disabled value="${nome_atual}" class="input-container"></p> <span class="material-symbols-outlined selecionar" onclick="deletarLinha(${id_linha})">delete</span>
       </div>
      
       <div class="nomeNumero">
         <p> Número: <input id="input_numero" type="text" disabled value="${numero_atual}" class="input-container"></p> <span class="material-symbols-outlined selecionar">edit</span>
       </div> `;

       

     }
   });
}

function deletarLinha(idLinha) {
  swal({
    title: "Cuidado!",
    text: "Todas as estações dessa linha serão escluidas. Você tem certeza que deseja continuar?",
    icon: "warning",
    buttons: {
       cancel: "Cancelar",
       confirm: "SIM!"
    }
}).then((confirmacao) => {
    if (confirmacao) {

        console.log('id linha=>', idLinha);
        fetch(`/dashboard/deletarLinha/${idLinha}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
          },
        }).then(function (resposta) {
          if (resposta.ok) {
            swal({
              title: "Sucesso!",
              text: "A linha foi excluída!",
              icon: "success",
          }).then((confirmacao) => {
            if(confirmacao){
              exibirLinha();
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



function exibirDivAddLinha(){


  document.getElementById('divAdd').style.display = 'block';
  document.getElementById('divAdd').style.display = 'flex';
  document.getElementById('container-linha').style.display = 'none';
  document.getElementById('ver').style.color = 'black';
  document.getElementById('add').style.color = '#F27A5E';
  
  // var container = document.getElementById('container-linha');  
  // container.display = 'none';

}

function cadastrarLinha(){
    var nome = ipt_nome.value;
    var numero = ipt_numero.value;
    var idEmpresa = sessionStorage.ID_EMPRESA


    if(numero !== '' && nome !== '' && numero >= 0){
        fetch("/empresa/cadastrarLinha", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: nome,
              numero: numero,
              idEmpresa: idEmpresa
            }),
          }).then(function (resposta) {
                swal('Eba!', 'Linha cadastrada!', 'success');
            }
          )}
    else{
        swal('Ei!', 'Preencha todos os campos e não deixe o número negativo!', 'error');
    }

}


