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

function exibirEstacoes() {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var idLinha = select_linha.value;

  fetch(`/dashGeral/exibirEstacoes/${idEmpresa}/${idLinha}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        primeira_linha.innerHTML = "";  
        segunda_linha.innerHTML = "";  
        var auxiliar = 0;
        total_maquinas.innerHTML = resposta.length;

        resposta.forEach(function (resposta) {
          auxiliar++ 
          console.log('nome estação =>', resposta.nome);
          console.log('id estação =>', resposta.idEstacao);

          if (auxiliar % 2 == 0) {
            primeira_linha.innerHTML += string(resposta);
          } else {
            segunda_linha.innerHTML += string(resposta);
          }
        });
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  })
}

function filtrarEstacao() {
  var pesquisarVar = ipt_pesquisar.value;
  
  if (pesquisarVar !== null && pesquisarVar !== '' && pesquisarVar !== undefined && pesquisarVar.length >= 3) {
    primeira_linha.innerHTML =  '';
    segunda_linha.innerHTML =  '';
        fetch(`/dashGeral/pesquisarEstacao/${pesquisarVar}`, { cache: 'no-store' })
        .then(function (response) {
          if (response.ok) { response.json().then(function (resposta) {
            primeira_linha.innerHTML = `<div onclick="verDash(${resposta[0].idEstacao})" class="card-maquina">
            <img class="img-pc" src="../assets/imgs/computador.png">
              <div class="estacao-alerta">
                <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon>
                <span id="nome_estacao">${resposta[0].nome}</span>
              </div>
            </div>`
          });
        } else console.error('Nenhum dado encontrado ou erro na API');
      })  
    }
}

function filtrarPorAlerta(alerta) {
  fetch(`/dashGeral/filtrarPorAlerta/${alerta}`, { cache: 'no-store' })
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
            primeira_linha.innerHTML += string(resposta);
          } else {
            segunda_linha.innerHTML += string(resposta);
          }
        });
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  })
}

function atualizarQtdProblemas() {
  var idLinha = select_linha.value;

  fetch(`/dashGeral/atualizarQtdProblemas/${idLinha}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        span_qtd_problemas.innerHTML = resposta[0].qtdProblemas
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  })
}

function atualizarEstacaoAlerta() {
  var idLinha = select_linha.value;

  fetch(`/dashGeral/atualizarEstacaoAlerta/${idLinha}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(resposta);
        span_estacao_alerta.innerHTML = resposta[0].nome;
        span_qtd_alertas.innerHTML = resposta[0].qtdAlertas;
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  })
}

function atualizarQtdAlertasGeral() {
  var idLinha = select_linha.value;

  fetch(`/dashGeral/atualizarEstacaoAlerta/${idLinha}`, { cache: 'no-store' })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {
        console.log(resposta);
        span_estacao_alerta.innerHTML = resposta[0].nome;
        span_qtd_alertas.innerHTML = resposta[0].qtdAlertas;
      });
    } else console.error('Nenhum dado encontrado ou erro na API');
  })
}

function alternarSelecionadoCuidado() {
  const botao_cuidado = document.getElementById('botao_cuidado');
  botao_cuidado.classList.toggle('selecionado');

  if(botao_cuidado.classList.contains('selecionado')) {
    const botao_problema = document.getElementById('botao_problema');
    botao_problema.classList.remove('selecionado');

    filtrarPorAlerta('Cuidado');
  }
}

function alternarSelecionadoProblema() {
  const botao_problema = document.getElementById('botao_problema');
  botao_problema.classList.toggle('selecionado');
  
  if(botao_problema.classList.contains('selecionado')) {
    const botao_cuidado = document.getElementById('botao_cuidado');
    botao_cuidado.classList.remove('selecionado');

    filtrarPorAlerta('Problema');
  }
}


function verDash(idEstacao) {
  sessionStorage.setItem("estacaoId", idEstacao);
  window.location = '../html/dashboard.html';
}

function string(resposta) {
  var textoEstacao = `<div onclick="verDash(${resposta.idEstacao})" class="card-maquina">
  <img class="img-pc" src="../assets/imgs/computador.png">
    <div class="estacao-alerta">
      <sl-icon class="icone-perigo" name="exclamation-circle"></sl-icon>
      <span id="nome_estacao">${resposta.nome}</span>
    </div>
  </div>`;

  return textoEstacao;
}