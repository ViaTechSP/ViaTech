function listarLinhas(idEmpresa) {
    var idEmpresa = sessionStorage.ID_EMPRESA;
    var select = document.getElementById("select_linha");
  
    fetch(`/dashboard/listarLinhas/${idEmpresa}`, { cache: 'no-store' })
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

function exibirEstacoes() {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var idLinha = select_linha.value;

  fetch(`/dashboard/exibirEstacoes/${idEmpresa}/${idLinha}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        primeira_linha.innerHTML = "";  
        segunda_linha.innerHTML = "";  
        var auxiliar = 0;
        total_maquinas.innerHTML = resposta.length;

        resposta.forEach(function (resposta) {
          auxiliar++ 

          if (auxiliar % 2 == 0) {
            primeira_linha.innerHTML += `
            <div class="card-maquina">
              <img class="img-pc" src="../assets/imgs/computador.png">
                <div class="estacao-alerta">
                  <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon>
                  <span id="nome_estacao">${resposta.nome}</span>
                </div>
            </div>`
          } else {
            segunda_linha.innerHTML += `
            <div onclick="irParaDashboard(${resposta.idEstacao})" class="card-maquina">
              <img class="img-pc" src="../assets/imgs/computador.png">
                <div class="estacao-alerta">
                  <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon>
                  <span id="nome_estacao">${resposta.nome}</span>
                </div>
              </div>
            `
          }
        });
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  })
}