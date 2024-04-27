function listarLinhas(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
  
  fetch(`/dashboard/listarLinhas/${idEmpresa}`)
      .then(resposta => {
          if (resposta.status == 200) {
              resposta.json().then(resposta => {
  
                  console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
  
                  var select = document.getElementById("select_linha");
  
                  resposta.forEach(function(resposta) {
                      var option = document.createElement("option");
                      option.value = resposta.idLinha;
                      option.text = resposta.nome;
                      select.appendChild(option);
                  });
              });
          } else {
              console.error(`Nenhum dado encontrado para o id ${idEmpresa} ou erro na API`);
          }
      })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
      });
  
  }




  function exibirEstacoes() {
    var primeiraLinha = document.getElementById('primeira_linha');  
    
    var segundaLinha = document.getElementById('segunda_linha');  
    
    
    fetch("/dashboard/exibirEstacoes", { 
       method: "GET", 
     })     

    .then(function (resposta) {
       if (!resposta.ok) { 
         throw new Error('Erro na requisição');
        }
       return resposta.json();
      })

    .then((resposta) => { 
     var qtd_estacoes = resposta.length;

    var auxiliar = 0;

    for (var i = 0; i < qtd_estacoes; i++) {
     var nome_atual = lista_funcionario[i].nome;
     var cargo_atual = lista_funcionario[i].cargo;
     var email_atual = lista_funcionario[i].email;
     var cpf_atual = lista_funcionario[i].cpf;
     
     auxiliar++;

     if(auxiliar % 2 == 0){
       primeiraLinha.innerHTML += `<div id="exibindoFuncionarioPar" class="itemFun">${nome_atual} - ${cargo_atual}<br>${cpf_atual}<br>${email_atual}</div>`;
     
     }  else{
       segundaLinha.innerHTML += `<div id="exibindoFuncionarioImpar" class="itemFun">${nome_atual} - ${cargo_atual}<br>${cpf_atual}<br>${email_atual}</div>`;
     }
    }
  });

 }