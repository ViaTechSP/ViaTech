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
          console.error(`Erro na obtenção das linhas disponíveis para listagem: ${error.message}`);
      });
  
  }




  function exibirEstacoes() {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    console.log('id: ', idEmpresa)
    var primeiraLinha = document.getElementById('primeira_linha');  
    
    var segundaLinha = document.getElementById('segunda_linha');  
    
    
    fetch(`/dashboard/exibirEstacoes/${idEmpresa}`, { 
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

    var auxiliar = 0;

    for (var i = 0; i < 10; i++) {

     
     auxiliar++;

     if(auxiliar % 2 == 0){
       primeiraLinha.innerHTML += `<sl-card class="card-basic" style="max-width: 200px; height: 48.5%;">
       This is just a basic card. No image, no header, and no footer. Just your content.
     </sl-card>
     `;
     
     }  else{
       segundaLinha.innerHTML += `<sl-card class="card-basic" style="max-width: 200px; height: 48.5%;">
       This is just a basic card. No image, no header, and no footer. Just your content.
     </sl-card>`;
     }
    }
  });

 }