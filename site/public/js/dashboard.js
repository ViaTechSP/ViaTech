function listarMaquinas(idEmpresa) {
  var idEmpresa = sessionStorage.ID_EMPRESA;
  var select = document.getElementById("select_estacao");

  fetch(`/dashboard/listarMaquinas/${idEmpresa}`)
    .then(resposta => {
      if (resposta.status == 200) {
        resposta.json().then(resposta => {
          resposta.forEach(function (resposta) {
            var option = document.createElement("option");
            option.value = resposta.idEstacao;
            option.text = resposta.nome;
            select.appendChild(option);
          });
        });
      } else console.error(`Nenhum dado encontrado para o id ${idEmpresa} ou erro na API`);
    })
}

function obterInfoHeader(fkEstacao) {
  fetch(`/dashboard/obterInfoHeader/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          resposta.reverse();
          span_so.innerHTML = resposta[0].sistemaOperacional
          span_cpu.innerHTML = resposta[0].nomeCpu
          span_ram.innerHTML = resposta[0].ramTotal
          span_disco.innerHTML = resposta[0].armazenamentoTotal
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
}

function obterHistoricoAlerta(fkEmpresa) {
  var fkEmpresa = sessionStorage.ID_EMPRESA;

  fetch(`/dashboard/obterHistoricoAlerta/${fkEmpresa}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          container_alertas.innerHTML = ''
          resposta.forEach(function (resposta) {

            if (resposta.tipo == 'Problema' || resposta.tipo == 'Alerta') {
              container_alertas.innerHTML += ` <div class="alertas-quadrado"> <div class="vermelho">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
              ${resposta.componente} > ${resposta.valor}%</div>`
            } else if (resposta.tipo == 'Cuidado') {
              container_alertas.innerHTML += ` <div class="alertas-quadrado">  <div class="amarelo">${resposta.tipo} </div> - Estação ${resposta.nome} <br>
              ${resposta.componente} > ${resposta.valor}%</div>`
            } 

          });
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
}

function atualizarKPIs(fkEstacao) {
  fetch(`/dashboard/obterInfoKPIAlertas/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          resposta.forEach(function (resposta) {
            if (resposta.tipo == 'Cuidado') {
              span_kpi_cuidado.innerHTML = resposta.total;
            }
            else if (resposta.tipo == 'Problema') {
              span_kpi_problema.innerHTML = resposta.total;
            } 
            else {
              span_kpi_cuidado.innerHTML = 0;
              span_kpi_problema.innerHTML = 0;
            }
          });
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
    
    fetch(`/dashboard/obterInfoKPIComponente/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
            span_kpi_componente.innerHTML = resposta[0].componente + ', com '+ resposta[0].total + ' alertas'
        });
      } else console.error('Nenhum dado encontrado ou erro na API');
    })
}

function obterDadosGrafico(fkEstacao) {  
  fetch(`/dashboard/obterDadosGrafico/${fkEstacao}`, { cache: 'no-store' })
    .then(function (response) {
      if (response.ok) {
          response.json().then(function (resposta) {
              resposta.reverse();
              plotarGrafico(resposta);

          });
      } else {
          console.error('Nenhum dado encontrado ou erro na API');
      }
  })
      .catch(function (error) {
          console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
      });
}

function plotarGrafico(resposta) {
  let labels = [];
  let cpuData = [];
  let discoData = [];
  let ramData = [];
  let temperaturaData = [];

  for (let i = 0; i < resposta.length; i++) {
      var registro = resposta[i];
      labels.push(formatDateTime(registro.dtHora));
      cpuData.push(registro.cpuPorcentagemUso);
      discoData.push(registro.discoDisponivel);
      ramData.push(registro.ramUtilizada);
      temperaturaData.push(registro.cpuTemperatura);
  }

  const createChart = (ctx, label, data, borderColor, backgroundColor) => {
      return new Chart(ctx, {
          type: 'line',
          data: {
              labels: labels,
              datasets: [{
                  label: label,
                  data: data,
                  fill: true,
                  borderColor: borderColor,
                  backgroundColor: backgroundColor,
                  tension: 0.4,
                  pointBackgroundColor: 'white',
                  pointBorderColor: borderColor,
                  pointHoverBackgroundColor: borderColor,
                  pointHoverBorderColor: 'white'
              }]
          },
          options: {
              plugins: {
                  title: {
                      display: true,
                      text: label,
                      font: {
                          size: 20
                      }
                  }
              },
              scales: {
                  y: {
                      beginAtZero: true,
                      ticks: {
                          callback: function(value) {
                              return value + '%';
                          }
                      }
                  }
              },
              elements: {
                  line: {
                      borderWidth: 2
                  },
                  point: {
                      radius: 5,
                      hoverRadius: 7
                  }
              }
          }
      });
  };

  createChart(document.getElementById('cpuChart'), 'CPU %', cpuData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  createChart(document.getElementById('discoChart'), 'Disco GB', discoData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  createChart(document.getElementById('ramChart'), 'RAM %', ramData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
  createChart(document.getElementById('temperaturaChart'), 'Temperatura º', temperaturaData, 'rgb(75, 192, 192)', 'rgba(75, 192, 192, 0.2)');
}

function formatDateTime(dtHora) {
  const date = new Date(dtHora);

  const formattedDate = date.toLocaleDateString('pt-BR', {
      month: '2-digit',
      day: '2-digit'
  });

  const formattedTime = date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
  });

  return `${formattedDate} ${formattedTime}`;
}

function chamarFuncoes() {
  var fkEstacao = localStorage.getItem("estacaoId");
  document.getElementById("select_estacao").value = localStorage.getItem("estacaoId");
  
  obterDadosGrafico(fkEstacao),
  obterInfoHeader(fkEstacao),
  atualizarKPIs(fkEstacao);
  localStorage.removeItem("estacaoId");
  var fkEstacao = null;

}