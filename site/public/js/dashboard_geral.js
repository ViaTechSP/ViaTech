function listarLinhas(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;

    var total_maquinas = document.getElementById('total_maquinas');
  
  fetch(`/dashboard/listarLinhas/${idEmpresa}/`)
      .then(resposta => {
          if (resposta.status == 200) {
              resposta.json().then(resposta => {
  
                  console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
  
                  var select = document.getElementById("select_linha");
  
                  resposta.forEach(function(resposta) {
                    `<div class="alertas-quadrado">Problema - Estação Luz <br>
                    CPU > 89%</div>`

                    
                      var option = document.createElement("option");
                      option.value = resposta.idLinha;
                      option.text = resposta.nome;
                      select.appendChild(option);
                  });

                  total_maquinas.innerHTML = resposta.length;

              });
          } else {
              console.error(`Nenhum dado encontrado para o id ${idEmpresa} ou erro na API`);
          }
      })
      .catch(function (error) {
          console.error(`Erro na obtenção das linhas disponíveis para listagem: ${error.message}`);
      });
  
  }




  function exibirEstacoes() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var idLinha = select_linha.value;


    console.log('id: ', idEmpresa)
    var primeiraLinha = document.getElementById('primeira_linha');  
    var segundaLinha = document.getElementById('segunda_linha');  
    var total_maquinas = document.getElementById('total_maquinas')
    
    fetch(`/dashboard/exibirEstacoes/${idEmpresa}/${idLinha}`, { 
       method: "GET", 
     })     

    .then(function (resposta) {
       if (!resposta.ok) { 
         throw new Error('Erro na requisição');
        }
       return resposta.json();
      })

    .then((resposta) => { 
    console.log('resposta: ', resposta)
    
    var qtd_estacoes = resposta.length;
    total_maquinas.innerHTML = qtd_estacoes;

    var auxiliar = 0;
    primeira_linha.innerHTML = "";  
    segunda_linha.innerHTML = "";  

    for (var i = 0; i < qtd_estacoes; i++) {
      auxiliar++ 

      if (auxiliar <= 8) {
        primeira_linha.innerHTML += `
        <div class="card-maquina">
                            <img class="img-pc" src="../assets/imgs/computador.png">

                            <div class="estacao-alerta">
                                <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon>
                                <span id="nome_estacao">${resposta[i].nome}</span>
                            </div>
                        </div>` 
      } else {
        segunda_linha.innerHTML += 
        `
        <div class="card-maquina">
                            <img class="img-pc" src="../assets/imgs/computador.png">

                            <div class="estacao-alerta">
                                <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon>
                                <span id="nome_estacao">${resposta[i].nome}</span>
                            </div>
                        </div>
        `
      }
      
    }
  });

 }